# API Docs

---

School Service

```ts
createSchool();
deleteSchool();
updateSchool();
getSchool();
```

---

## User Service

```ts
@protected by Admin Status
createAdmin(schoolId: number, username: string, password: string, name: string, dateOfBirth: number, address: string) : UserId;
deleteAdmin(userId: number) : boolean;

createFaculty(schoolId: number, username: string, password: string, name: string, dateOfBirth: number, address: string) : UserId;
deleteFaculty(userId: number) : boolean;

createStudent(schoolId: number, username: string, password: string, name: string, dateOfBirth: number, address: string) : UserId;
deleteStudent(userId: number) : boolean;

createParent(schoolId: number, username: string, password: string, name: string, dateOfBirth: number, address: string, studentId: number) : UserId;
deleteParent(userId: number) : boolean;

@protected by Admin Status or Owning User
updateUser(userId: number, name?: string, dateOfBirth?: number, address?: string, studentId?: number) : User;
getUser(userId: number) : User;

type UserId = number;
```

### Manages Tables

- Users

---

## Classroom Service

```ts
@protected by Admin Status
createClassroom(floor: number, room: number, capacity: number) : ClassroomId;
deleteClassroom(classroomId: number) : boolean;
updateClassroom(classroomId: number, floor?: number, room?: number, capacity?: number)

@protected by Logged in
findClassroomsByFloor()

type ClassroomId = number;
```

### Manages Tables

- Classrooms

---

Course Service

```ts
@protected by Admin Status
createCourse(classroomId: number, teacherId: number, name: string, subject: CourseSubjects, time: number): CourseId
deleteCourse(courseId: number) : boolean;

@protected By Admin or Teacher of Course
updateCourse(classroomId?: number, name?: string, subject?: CourseSubjects, time?: number) : Course;

createHomework(courseId: number, name: string, dueDate: number): HomeworkId;
updateHomework(courseId: number, name?: string, dueDate?: number): Homework;

setGradeForStudent(courseId: number, studentId: number, grade: Grade) : boolean;
getGradesForStudent(courseId: number, studentId: number): Grade[]

@protected by Users of Course
submitHomework(homeworkId: number, homework: File): boolean;

@protected by Logged in
findCoursesByTeacher(name: string) : Course[];
findCoursesByCourseName(name: string) : Course[];
findCoursesBySubject(subject: CourseSubjects) : Course[];
findCoursesByTime(time: number) : Course[];
findCourses() : Course[];

type CourseId = number;
type CourseSubjects = 'Computer Science' | 'English' | 'French' ....
interface Grade {
grade: string;
note: string;
homeworkId?: number;
}
type HomeworkId = number;

```

### Manages Tables

- Courses
- Homework
- Marks
- StudentCourses
- StudentAttendance
