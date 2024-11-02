let storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
window.users = [
    {
        fullName: "Ali Yilmaz",
        phone: "+905321234567",
        email: "ali.yilmaz@example.com",
        username: "user1",
        password: "password1",
        organization: "\"Ankara Health Institute\"",
        experience: "2 years in emergency assistance",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Ayse Kaya",
        phone: "+905327654321",
        email: "ayse.kaya@example.com",
        username: "user2",
        password: "password2",
        organization: "\"Istanbul Medical College\"",
        experience: "3 years in clinical support",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Mehmet Demir",
        phone: "+905311234567",
        email: "mehmet.demir@example.com",
        username: "user3",
        password: "password3",
        organization: "\"Bursa State Hospital\"",
        experience: "1 year in pediatric care",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Fatma Celik",
        phone: "+905312345678",
        email: "fatma.celik@example.com",
        username: "user4",
        password: "password4",
        organization: "\"Izmir General Hospital\"",
        experience: "4 years in surgery assistance",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Mustafa Erdogan",
        phone: "+905313456789",
        email: "mustafa.erdogan@example.com",
        username: "user5",
        password: "password5",
        organization: "\"Istanbul City Hospital\"",
        experience: "5 years in cardiology support",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Emine Aydin",
        phone: "+905314567890",
        email: "emine.aydin@example.com",
        username: "user6",
        password: "password6",
        organization: "\"Sakarya University Hospital\"",
        experience: "3 years in trauma care",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Hakan Sari",
        phone: "+905315678901",
        email: "hakan.sari@example.com",
        username: "user7",
        password: "password7",
        organization: "\"Marmara Health Institute\"",
        experience: "6 months in orthopedics",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Selin Kilic",
        phone: "+905316789012",
        email: "selin.kilic@example.com",
        username: "user8",
        password: "password8",
        organization: "\"Trabzon Medical College\"",
        experience: "2 years in outpatient assistance",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Ahmet Yildiz",
        phone: "+905317890123",
        email: "ahmet.yildiz@example.com",
        username: "user9",
        password: "password9",
        organization: "\"Konya Health Clinic\"",
        experience: "1 year in patient relations",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Burcu Ozturk",
        phone: "+905318901234",
        email: "burcu.ozturk@example.com",
        username: "user10",
        password: "password10",
        organization: "\"Adana Research Hospital\"",
        experience: "5 years in patient care coordination",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Cem Kara",
        phone: "+905319012345",
        email: "cem.kara@example.com",
        username: "user11",
        password: "password11",
        organization: "\"Van University Hospital\"",
        experience: "8 months in medical records",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Eda Guler",
        phone: "+905320123456",
        email: "eda.guler@example.com",
        username: "user12",
        password: "password12",
        organization: "\"Diyarbakir Health Institute\"",
        experience: "2 years in emergency room support",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Berk Polat",
        phone: "+905321234567",
        email: "berk.polat@example.com",
        username: "user13",
        password: "password13",
        organization: "\"Samsun General Hospital\"",
        experience: "1 year in radiology assistance",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Gizem Arslan",
        phone: "+905322345678",
        email: "gizem.arslan@example.com",
        username: "user14",
        password: "password14",
        organization: "\"Antalya University Hospital\"",
        experience: "3 years in oncology support",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Onur Simsek",
        phone: "+905323456789",
        email: "onur.simsek@example.com",
        username: "user15",
        password: "password15",
        organization: "\"Gaziantep Medical Center\"",
        experience: "6 months in administrative support",
        dutyDepartment: "",
        userType: "assistant",
        dutyDate: ""
    },
    {
        fullName: "Dr. John Smith",
        phone: "+905329876543",
        email: "john.smith@example.com",
        username: "teacher1",
        password: "teachpass1",
        organization: "\"Hematology & Oncology\"", // Set to Instructor for educators
        experience: "Professor of Medicine",
        dutyDepartment: "Oncology",
        userType: "instructor",
        dutyDate: ""
    },
    {
        fullName: "Dr. Sarah Tancredi",
        phone: "+905321234890",
        email: "sarah.tancredi@example.com",
        username: "teacher2",
        password: "teachpass2",
        organization: "\"Intensive Care Department\"",
        experience: "Assistant Professor",
        dutyDepartment: "Intensive Care",
        userType: "instructor",
        dutyDate: ""
    },
    {
        fullName: "Dr. Abraham Jones",
        phone: "+905321234890",
        email: "abraham.jones@example.com",
        username: "teacher3",
        password: "teachpass3",
        organization: "\"Emergency Department\"",
        experience: "Associate Professor",
        dutyDepartment: "Emergency",
        userType: "instructor",
        dutyDate: ""
    }
];
const defaultUsers = JSON.parse(JSON.stringify(window.users));
if(storedUsers && Array.isArray(storedUsers)){
    window.users = storedUsers;
}
else{
    localStorage.setItem("storedUsers", JSON.stringify(window.users));
    storedUsers = window.users;
    console.log("Copied Original Data");
}
function resetToDefault(){
    localStorage.removeItem("storedUsers");
    localStorage.setItem("storedUsers", JSON.stringify(defaultUsers));
    storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
    window.location.href = "login.html";
}
