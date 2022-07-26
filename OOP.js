class Person{
    constructor(maSV,tenSV, tuoi, gioiTinh, ngaySinh, lop){
        this.maSV =maSV;
        this.tenSV =tenSV;
        this.tuoi =tuoi;
        this.gioiTinh =gioiTinh;
        this.ngaySinh =ngaySinh;
        this.lop =lop;
    }
}

class Student extends Person{
    
    constructor(maSV,tenSV, tuoi, gioiTinh, ngaySinh, lop,  diemToan, diemLy, diemHoa, diemAnh){
        super(maSV,tenSV, tuoi, gioiTinh, ngaySinh, lop);
        this.diemToan =diemToan;
        this.diemLy =diemLy;
        this.diemHoa =diemHoa;
        this.diemAnh =diemAnh;
    }

    averageScore(){
        this.average = (this.diemToan+this.diemLy+this.diemHoa+this.diemAnh)/4;
        return this.average;
    }

    rank(){
        if (this.average < 4) {
            return "F";
          } 
          if (this.average < 5) {
            return "D";
          }  
          if (this.average < 5.5) {
            return "D+";
          } 
          if (this.average < 7) {
            return "C";
          }  
          if (this.average < 8.5) {
            return "B";
          }  
            return "A";
    }

    passAll(){
        if (this.diemToan > 4 && this.diemLy > 4 && this.diemHoa > 4 && this.diemAnh > 4){
            return true;
        }else{
            return false;
        }
    }

}

class Major{
    constructor(major){
        this.major = major;
    }
    maxScoreStudent(listOfStudent){
        const students = listOfStudent.filter((student) => student.lop === this.major);
        let max = students[0].averageScore();
        for (var i = 0; i < students.length; i++) {
          if (max < students[i].averageScore()) {
          max = students[i].averageScore();
          }
        }
        const studentMax = students.filter((student) => student.averageScore() === max);
      
        return studentMax[0].tenSV+ " ("+ studentMax[0].averageScore() +")";
        
    }

    minScoreStudent(listOfStudent){
        const students = listOfStudent.filter((student) => student.lop === this.major);
        let min = students[0].averageScore();
        for (var i = 0; i < students.length; i++) {
          if (min > students[i].averageScore()) {
          min = students[i].averageScore();
          }
        }
        const studentMin = students.filter((student) => student.averageScore() === min);
      
        return studentMin[0].tenSV+ " ("+ studentMin[0].averageScore() +")";
        
    }


}

const colorize = (...args) => ({
    black: `\x1b[30m${args.join(' ')}`,
    red: `\x1b[31m${args.join(' ')}`,
    green: `\x1b[32m${args.join(' ')}`,
    yellow: `\x1b[33m${args.join(' ')}`,
    blue: `\x1b[34m${args.join(' ')}`,
    magenta: `\x1b[35m${args.join(' ')}`,
    cyan: `\x1b[36m${args.join(' ')}`,
    white: `\x1b[37m${args.join(' ')}`,
    bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
    bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
    bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
    bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
})


const data = require("./dulieu.json");
const listOfStudent = data.map((student) => new Student(student.maSV, student.tenSV, student.tuoi, student.gioiTinh, student.ngaySinh, student.lop, student.diemToan, student.diemLy, student.diemHoa, student.diemAnh));
const listOfMajor = [...new Set(data.map((student) => student.lop))];
console.log("Danh sách sinh viên:");
console.log(listOfStudent);

console.log("");
console.log("Điểm trung bình và xếp loại của từng học sinh: ");
for (let i =0; i < listOfStudent.length; i++){
    console.log(listOfStudent[i].tenSV +" : " + listOfStudent[i].averageScore() +" (" +listOfStudent[i].rank() +")");
}
console.log("");

console.log(colorize("Sinh viên có điểm trung bình cao nhất mỗi lớp: ").green)
for (let i =0; i < listOfMajor.length; i++){
    let major = new Major(listOfMajor[i]);
    console.log(major.major + " : ")
    console.log(major.maxScoreStudent(listOfStudent));
}
console.log("")
console.log(colorize("Sinh viên có điểm trung bình thấp nhất mỗi lớp: ").red)
for (let i =0; i < listOfMajor.length; i++){
    let major = new Major(listOfMajor[i]);
    console.log(major.major + " : ")
    console.log(major.minScoreStudent(listOfStudent));
}

console.log("")
console.log(colorize("Sinh viên qua môn với điểm các môn ≥ 4.0: ").yellow)
const passedStudent = listOfStudent.map((student) => student.passAll())
for (let j =0; j< passedStudent.length; j++){
    if (passedStudent[j]){
        console.log(data[j].tenSV)
    }
}

console.log("Lọc học sinh theo lớp")
for (i of listOfMajor){
    console.log(i +":")
    for (j of listOfStudent){
        if (j.lop == i){
            console.log(j)
        }
    }

}





