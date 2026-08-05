// ================= Person

class Person {
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (value.includes("@")) {
            this.#email = value;
        } else {
            console.log("Invalid Email");
        }
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (value > 0) {
            this.#id = value;
        } else {
            console.log("Invalid ID");
        }
    }

    describeRole() {
        console.log("I am a person.");
    }
}

// ================= Principal

class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log(`${member.name} added.`);
    }

    removeMember(id) {
        this.members = this.members.filter(member => member.id !== id);
        console.log("Member removed.");
    }

    listMembers() {
        console.log("School Members:");
        this.members.forEach(member => {
            console.log(member.name);
        });
    }

    describeRole() {
        console.log(`${this.name} is the Principal.`);
    }
}

// ================= Teacher 

class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({
            studentName,
            grade
        });
    }

    listGrades() {
        console.log("Grades:");
        this.grades.forEach(item => {
            console.log(`${item.studentName} : ${item.grade}`);
        });
    }

    describeRole() {
        console.log(`${this.name} teaches ${this.subject}.`);
    }
}

// ================= Student 

class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enroll(subject) {
        this.subjects.push(subject);
    }

    viewSubjects() {
        console.log(`${this.name}'s Subjects:`);
        this.subjects.forEach(subject => {
            console.log(subject);
        });
    }

    describeRole() {
        console.log(`${this.name} is a Student.`);
    }
}

// ================= Create Objects

let principal = new Principal("Ahmed", "ahmed@gmail.com", 1);

let teacher = new Teacher("Mohamed", "mohamed@gmail.com", 2, "JavaScript");

let student = new Student("Ali", "ali@gmail.com", 3);

// ================= Principal Actions 

principal.addMember(teacher);
principal.addMember(student);

principal.listMembers();

// ================= Teacher Actions 

teacher.gradeStudent("Ali", 95);
teacher.gradeStudent("Omar", 88);

teacher.listGrades();

// ================= Student Actions

student.enroll("JavaScript");
student.enroll("HTML");
student.enroll("CSS");

student.viewSubjects();

// ================= Store All Members

let schoolMembers = [
    principal,
    teacher,
    student
];

console.log("-------------");

schoolMembers.forEach(member => {
    member.describeRole();
});