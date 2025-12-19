from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, database, deps

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/", response_model=List[schemas.CourseOut])
def get_courses(db: Session = Depends(database.get_db)):
    courses = db.query(models.Course).all()
    # Populate enrollment count roughly
    results = []
    for course in courses:
        count = db.query(models.Enrollment).filter(models.Enrollment.course_id == course.id).count()
        course.enrollment_count = count
        results.append(course)
    return results

@router.post("/", response_model=schemas.CourseOut)
def create_course(
    course: schemas.CourseCreate, 
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(deps.get_current_admin)
):
    existing_course = db.query(models.Course).filter(models.Course.course_code == course.course_code).first()
    if existing_course:
        raise HTTPException(status_code=400, detail="Course code already exists")
    
    new_course = models.Course(**course.model_dump())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    course_id: int,
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(deps.get_current_admin)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(course)
    db.commit()
    return None