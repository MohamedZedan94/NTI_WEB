function calculateAverage(grades) {

    let sum = 0;

    grades.forEach(grade => {
        sum += grade;
    });

    return sum / grades.length;

}

export default calculateAverage;