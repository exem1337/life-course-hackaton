interface Faculty {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  university_id: number;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  faculty_id: number;
  createdAt: string;
  updatedAt: string;
  faculty: Faculty;
}

interface Direction {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  department_id: number;
  graduate_level: string;
  specialty_code: string;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

interface Student {
  id: number;
  user_id: number;
  group_id: number;
}

interface IGroup {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  direction_id: number;
  createdAt: string;
  updatedAt: string;
  Students: Student;
  direction: Direction;
}

export default IGroup;
