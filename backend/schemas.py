from pydantic import BaseModel, EmailStr
from typing import List, Optional

# User Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "student"

class UserOut(UserBase):
    id: int
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Course Schemas
class CourseBase(BaseModel):
    course_code: str
    title: str
    instructor: str
    credits: int
    max_seats: int
    is_open: bool = True

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    id: int
    enrollment_count: Optional[int] = 0

    class Config:
        from_attributes = True

# Enrollment Schemas
class EnrollmentCreate(BaseModel):
    course_id: int

class EnrollmentOut(BaseModel):
    id: int
    course: CourseOut
    
    class Config:
        from_attributes = True