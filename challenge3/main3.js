let studentName= prompt ("Enter your name");
let attendance = Number(prompt ("enter attendance "));
let mid=Number(prompt ("enter mid score"));
let finalscore= Number(prompt("enter final score"));
let assignment =Number(prompt("enter assignmet score:"));
let payment = prompt ("payment or not payment??");
if (payment == "not payment" )
{
    alert("you cannot view your result");

}else {
    let grade ;
    let total = mid + finalscore + assignment ;
    if (total >= 90){
        grade = "A";
    }else if (total >= 80 ){
        grade = "B";
    }else if (total >= 70){
        grade = "C";
    }else if (total >= 60){
        grade = "D";
    }else {
        grade = "F";
    }
    let status;
    if(attendance<60)
        {
            status = "fail";
        }    
        else {
            status = "pass";
        }


    alert(
        "======= STUDENT RESULT =======\n\n" +
        "Student Name: " + studentName +
        "\nAttendance: " + attendance + "%" +
        "\nMidterm: " + mid +
        "\nFinal Exam: " + finalscore+
        "\nAssignment: " + assignment +
        "\nTotal Score: " + total +
        "\nGrade: " + grade +
        "\nAcademic Status: " + status
    );





}