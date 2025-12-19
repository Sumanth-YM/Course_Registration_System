# backend/routers/enrollments.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload  # <--- IMPORT joinedload
from typing import List

from .. import models, schemas, database, deps

router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

@router.post("/{course_id}", response_model=schemas.EnrollmentOut)
def enroll_student(
    course_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    # 1. Check if course exists
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # 2. Check if course is open
    if not course.is_open:
        raise HTTPException(status_code=400, detail="Course is closed for enrollment")
    
    # 3. Check for existing enrollment
    existing = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    # 4. Check capacity
    current_count = db.query(models.Enrollment).filter(models.Enrollment.course_id == course_id).count()
    
    if current_count >= course.max_seats:
        raise HTTPException(status_code=400, detail="Course is full")
    
    # Create enrollment
    enrollment = models.Enrollment(user_id=current_user.id, course_id=course_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    
    return enrollment

@router.get("/my", response_model=List[schemas.EnrollmentOut])
def get_my_enrollments(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    return db.query(models.Enrollment)\
             .join(models.Course)\
             .filter(models.Enrollment.user_id == current_user.id)\
             .all()
@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def drop_course(
    course_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    
    db.delete(enrollment)
    db.commit()
    return None