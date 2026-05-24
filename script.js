// ===== Authentication =====
let isLoginMode = false;

const authTitle = document.getElementById("authTitle");
const authButton = document.getElementById("authButton");
const toggleAuth = document.getElementById("toggleAuth");

toggleAuth.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    authTitle.textContent = isLoginMode ? "Login" : "Sign Up";
    authButton.textContent = isLoginMode ? "Login" : "Sign Up";
    toggleAuth.innerHTML = isLoginMode
        ? 'Don\'t have an account? <a href="#">Sign Up</a>'
        : 'Already have an account? <a href="#">Login</a>';
});

authButton.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) return alert("Fill all fields");

    if (isLoginMode) {
        let storedUser = localStorage.getItem(username);
        if (storedUser && storedUser === password) {
            loginSuccess();
        } else {
            alert("Invalid login details");
        }
    } else {
        if (localStorage.getItem(username)) {
            alert("Username already exists");
        } else {
            localStorage.setItem(username, password);
            alert("Sign Up successful, now login!");
            isLoginMode = true;
            authTitle.textContent = "Login";
            authButton.textContent = "Login";
        }
    }
});

function loginSuccess() {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
}

// ===== Product Data =====
const products = [
    {name:"Milk",category:"Dairy", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/milk.jpg.jpeg?raw=true", video:"https://youtube.com/shorts/Yu9igRZeK_s?si=v0zNU15ofgWhasVs",test:"Boil and check for smell", review:"Often adulterated with water", experiences:[]},
    {name:"Turmeric",category:"Spices", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/turmeric.jpg.jpeg?raw=true",video:"https://youtube.com/shorts/xzI4oyX5g_o?si=Y86FCih1SRmNOQJi", test:"Add to water & check sediment", review:"Lead chromate sometimes added", experiences:[]},
    {name:"Honey",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/honey.jpg.jpeg?raw=true",video:"https://youtube.com/shorts/6kqHtpnBt88?si=98PJeKHlqGb2WbrJ" ,test:"Mix with water, pure honey sinks", review:"Sugar syrup often added", experiences:[]},
    {name:"Sugar",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/sugar.jpg.jpeg?raw=true", test:"Check for chalk powder",video:"https://youtube.com/shorts/fK7PTSY8TB8?si=oJDQiiQIAMFiM1Y6", review:"Sometimes mixed with chalk", experiences:[]},
    {name:"Salt",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/salt.jpg.jpeg?raw=true",video:"https://youtube.com/shorts/oT_6pZu0hQU?si=MiQBOmguEyPWr4VY", test:"Check for white powdered stone", review:"Stone powder possible", experiences:[]},
    {name:"Ghee",category:"Dairy", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/ghee.jpg.jpeg?raw=true", test:"Heat and check aroma",video:"https://youtube.com/shorts/Dp74Rr4IDBw?si=jFtQCxNVxkVXBWDC", review:"Mixed with vanaspati", experiences:[]},
    {name:"Tea Powder",category:"All" ,img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/teapowder.jpg.jpeg?raw=true", test:"Add to cold water",video:"https://youtube.com/shorts/ty7APfFNHz8?si=x1rLcynzbxY4aMVh", review:"Iron fillings found sometimes", experiences:[]},
    {name:"Coffee",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/coffee.jpg.jpeg?raw=true", test:"Check for tamarind seed powder",video:"https://youtube.com/shorts/sYbDsnT5WvY?si=u96438sA2jNUMjY0", review:"Cheap powders added", experiences:[]},
    {name:"Ice Cream",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/icecream.jpg.jpeg?raw=true", test:"Check for washing powder foam", review:"Non-edible fats used",video:"https://youtube.com/shorts/rYe-b_0hWK8?si=mwr_TWc-sn-6K1t7", experiences:[]},
    {name:"Soft Drinks",category:"Drinks", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/softdrinks.jpg.jpeg?raw=true", test:"Check excessive fizz", review:"Artificial color excess", experiences:[]},
    {name:"Fruits",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/fruits.jpg.jpeg?raw=true", test:"Dip in water, remove wax",video:"https://youtube.com/shorts/66c39D3aN68?si=KV9hT7AcAGD5LtHP", review:"Wax coating common", experiences:[]},
    {name:"Bread",category:"All", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/bread.jpg.jpeg?raw=true", test:"Check for smell",video:"https://youtube.com/shorts/Gq-kATANtMw?si=2lxSMvBXeP66vW1N", review:"Potassium bromate use",experiences:[]},
    {name:"Rice",category:"Grains", img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/rice.jpg.jpeg?raw=true",video:"https://youtube.com/shorts/1CiFbxQxVvg?si=8trFZIOD45VGpVNv", test:"Burn to smell plastic", review:"Plastic rice incidents", experiences:[]},
    {name:"Wheat Flour",category:"All",img:"https://github.com/girgaviaditi/food-adulteration-project/blob/main/wheatflour.jpg.jpeg?raw=true", test:"Check for chalk powder",video:"https://youtube.com/shorts/lYdlROTOWe4?si=hUGv8mlk2aXsBJiU.mp4", review:"Chalk mixed for weight", experiences:[]}
];

// ===== Render Products =====
const productList = document.getElementById("productList");

products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<img src="${p.img}" alt="${p.name}">
                     <h3>${p.name}</h3>
                     <p><strong>Test:</strong> ${p.test}</p>`;
    div.addEventListener("click", () => openModal(index));
    productList.appendChild(div);
});

// ===== Modal =====
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalTest = document.getElementById("modalTest");
const modalReview = document.getElementById("modalReview");
const modalImg = document.getElementById("modalImg");
const modalVideo = document.getElementById("modalVideo");
let currentIndex = null;

function openModal(i) {
    currentIndex = i;
    const item = products[i];
    modal.style.display = "block";
    modalTitle.textContent = item.name;
    modalTest.textContent = `Test: ${item.test}`;
    modalReview.textContent = `Review: ${item.review}`;
    modalImg.src = item.img;
    

    if (item.video) {
       const linkDiv = document.getElementById("modalVideoLink");
    const anchor = document.getElementById("videoAnchor");
    anchor.href = item.video;
    linkDiv.style.display = "block";
} else {
    document.getElementById("modalVideoLink").style.display = "none";
}
    renderExperiences();
}

function renderExperiences() {
    const list = document.getElementById("modalExperiences");
    list.innerHTML = "";
    products[currentIndex].experiences.forEach(exp => {
        const li = document.createElement("li");
        li.textContent = exp;
        list.appendChild(li);
    });
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
   
});

document.getElementById("addExperienceBtn").addEventListener("click", () => {
    const exp = document.getElementById("experienceInput").value.trim();
    if (exp) {
        products[currentIndex].experiences.push(exp);
        document.getElementById("experienceInput").value = "";
        renderExperiences();
    }
});
// ===== ENTER KEY FOR EXPERIENCE =====

document.getElementById("experienceInput")
.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        e.preventDefault();

        document
        .getElementById("addExperienceBtn")
        .click();
    }

});

// ===== Search =====
document.getElementById("searchBar").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    productList.innerHTML = "";
    products.filter(p => p.name.toLowerCase().includes(term)).forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `<img src="${p.img}" alt="${p.name}">
                         <h3>${p.name}</h3>
                         <p><strong>Test:</strong> ${p.test}</p>`;
        div.addEventListener("click", () => openModal(index));
        productList.appendChild(div);
    });
});
// ===== Categories =====

const categoryButtons =
document.querySelectorAll(".categoryBtn");

categoryButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const selected =
        btn.dataset.category;

        productList.innerHTML = "";

        const filtered =
        selected === "all"
        ? products
        : products.filter(
            p => p.category === selected
        );

        filtered.forEach((p,index)=>{

            const div =
            document.createElement("div");

            div.className = "product";

            div.innerHTML = `
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.test}</p>
            `;

            div.addEventListener(
                "click",
                ()=>openModal(index)
            );

            productList.appendChild(div);

        });

    });

});
// ===== SHARE WEBSITE =====

const shareBtn =
document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

    const websiteURL =
    window.location.href;

    const shareData = {

        title:
        "Food Adulteration Awareness",

        text:
        "Check out this Food Adulteration website!",

        url:
        websiteURL
    };

    // Mobile Sharing
    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (err) {

            console.log(err);

        }

    }

    // Desktop Sharing
    else {

        navigator.clipboard
        .writeText(websiteURL);

        alert(
            "Website link copied successfully!"
        );

    }

});
// ===== Dark Mode =====
const darkBtn = document.getElementById("darkModeToggle");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        darkBtn.textContent = "☀️ Light Mode";
    } else {
        darkBtn.textContent = "🌙 Dark Mode";
    }
});

// ===== ENTER KEY LOGIN =====

document
.getElementById("password")
.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        e.preventDefault();

        authButton.click();

    }

});
// ===== CONTACT FORM ENTER SUBMIT =====

document
.getElementById("contactForm")
.addEventListener("keypress", (e) => {

    // Don't submit inside textarea
    if (
        e.key === "Enter" &&
        e.target.tagName !== "TEXTAREA"
    ) {

        e.preventDefault();

        document
        .querySelector("#contactForm button")
        .click();
    }

});
// ===== PROFESSIONAL QUIZ =====

const quizQuestions = [

{
question:"Which adulterant is commonly found in milk?",

answers:[
"Water",
"Salt",
"Plastic",
"Stone"
],

correct:0
},

{
question:"Lead chromate is added in?",

answers:[
"Sugar",
"Turmeric",
"Honey",
"Rice"
],

correct:1
},

{
question:"Artificial color is mostly added in?",

answers:[
"Soft Drinks",
"Salt",
"Ghee",
"Milk"
],

correct:0
},

{
question:"Which food is mixed with vanaspati?",

answers:[
"Tea",
"Ghee",
"Rice",
"Coffee"
],

correct:1
},

{
question:"Wax coating is found on?",

answers:[
"Fruits",
"Salt",
"Sugar",
"Bread"
],

correct:0
},

{
question:"Plastic rice can be identified by?",

answers:[
"Smell after burning",
"Color",
"Taste",
"Cold water"
],

correct:0
},

{
question:"Tea powder may contain?",

answers:[
"Water",
"Salt",
"Iron filings",
"Sugar"
],

correct:2
},

{
question:"Honey is adulterated using?",

answers:[
"Soap",
"Sugar syrup",
"Plastic",
"Stone"
],

correct:1
},

{
question:"Which food may contain chalk powder?",

answers:[
"Wheat flour",
"Milk",
"Coffee",
"Tea"
],

correct:0
},

{
question:"Soft drinks may contain excessive?",

answers:[
"Protein",
"Artificial color",
"Fiber",
"Calcium"
],

correct:1
}

];

const quizModal =
document.getElementById("quizModal");

document
.getElementById("openQuiz")
.addEventListener("click",()=>{

    quizModal.style.display = "block";

});

document
.getElementById("closeQuiz")
.addEventListener("click",()=>{

    quizModal.style.display = "none";

});

const quizButtons =
document.querySelectorAll(".quizCountBtn");

let selectedQuiz = [];

let currentQuizIndex = 0;

let userAnswers = [];

let score = 0;

quizButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const count =
        Number(btn.dataset.count);

        selectedQuiz =
        quizQuestions.slice(0,count);

        document
        .getElementById("quizChoice")
        .style.display = "none";

        document
        .getElementById("quizArea")
        .style.display = "block";

        loadQuizQuestion();

    });

});

function loadQuizQuestion(){

    const q =
    selectedQuiz[currentQuizIndex];

    document
    .getElementById("quizQuestion")
    .textContent =
    `Q${currentQuizIndex+1}.
    ${q.question}`;

    const answersDiv =
    document.getElementById("quizAnswers");

    answersDiv.innerHTML = "";

    q.answers.forEach((ans,index)=>{

        const btn =
        document.createElement("button");

        btn.textContent = ans;

        btn.addEventListener("click",()=>{

    userAnswers[currentQuizIndex]
    = index;

    // Remove previous selected color

    document
    .querySelectorAll("#quizAnswers button")
    .forEach(b=>{

        b.classList.remove(
            "selectedAnswer"
        );

    });

    // Add selected color

    btn.classList.add(
        "selectedAnswer"
    );

});

        answersDiv.appendChild(btn);

    });

}

document
.getElementById("nextQuizBtn")
.addEventListener("click",()=>{

    currentQuizIndex++;

    if(currentQuizIndex < selectedQuiz.length){

        loadQuizQuestion();

    } else {

        showQuizResult();

    }

});

function showQuizResult(){

    document
    .getElementById("quizArea")
    .style.display = "none";

    const resultDiv =
    document.getElementById("quizResult");

    resultDiv.style.display = "block";

    let resultHTML = "";

    score = 0;

    selectedQuiz.forEach((q,index)=>{

        const correct =
        q.correct === userAnswers[index];

        if(correct) score++;

        resultHTML += `

        <p>

        <strong>
        Q${index+1}:
        ${q.question}
        </strong>

        <br>

        Your Answer:
        ${q.answers[userAnswers[index]] || "Not Answered"}

        <br>

        Correct Answer:
        ${q.answers[q.correct]}

        <br>

        ${correct ? "✅ Correct"
        : "❌ Wrong"}

        </p>

        <hr>
        `;
    });

    resultHTML += `
    <h2>
    Final Score:
    ${score}/${selectedQuiz.length}
    </h2>
    `;

    resultDiv.innerHTML =
    resultHTML;

}