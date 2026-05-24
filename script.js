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
    {name:"Milk",category:"Dairy", img:"https://mydiagnostics.in/cdn/shop/articles/img-1748326586409_1200x.jpg?v=1748327918", video:"https://youtube.com/shorts/Yu9igRZeK_s?si=v0zNU15ofgWhasVs",test:"Boil and check for smell", review:"Often adulterated with water", experiences:[]},
    {name:"Turmeric",category:"Spices", img:"https://www.viralspices.com/wp-content/uploads/2024/11/Untitled-1.jpg",video:"https://youtube.com/shorts/xzI4oyX5g_o?si=Y86FCih1SRmNOQJi", test:"Add to water & check sediment", review:"Lead chromate sometimes added", experiences:[]},
    {name:"Honey",category:"All", img:"https://astorapiaries.com/cdn/shop/articles/AA_How_to_tell_teh_difference_between_good_and_bad_honey_1080x.png?v=1686662686",video:"https://youtube.com/shorts/6kqHtpnBt88?si=98PJeKHlqGb2WbrJ" ,test:"Mix with water, pure honey sinks", review:"Sugar syrup often added", experiences:[]},
    {name:"Sugar",category:"All", img:"https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg", test:"Check for chalk powder",video:"https://youtube.com/shorts/fK7PTSY8TB8?si=oJDQiiQIAMFiM1Y6", review:"Sometimes mixed with chalk", experiences:[]},
    {name:"Salt",category:"All", img:"https://goqii.com/blog/wp-content/uploads/word-salt-made-sea-salt-spoon-black-smokey-background-scaled.jpg",video:"https://youtube.com/shorts/oT_6pZu0hQU?si=MiQBOmguEyPWr4VY", test:"Check for white powdered stone", review:"Stone powder possible", experiences:[]},
    {name:"Ghee",category:"Dairy", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqZ5UxSzSzXxUWjeanSxNzv9U4j9ZByTRfA&s", test:"Heat and check aroma",video:"https://youtube.com/shorts/Dp74Rr4IDBw?si=jFtQCxNVxkVXBWDC", review:"Mixed with vanaspati", experiences:[]},
    {name:"Tea Powder",category:"All" ,img:"https://goodness-farm.com/wp-content/uploads/2021/04/ctc-tea.jpg", test:"Add to cold water",video:"https://youtube.com/shorts/ty7APfFNHz8?si=x1rLcynzbxY4aMVh", review:"Iron fillings found sometimes", experiences:[]},
    {name:"Coffee",category:"All", img:"https://m.media-amazon.com/images/I/61f4SI+bXWL._UF1000,1000_QL80_.jpg", test:"Check for tamarind seed powder",video:"https://youtube.com/shorts/sYbDsnT5WvY?si=u96438sA2jNUMjY0", review:"Cheap powders added", experiences:[]},
    {name:"Ice Cream",category:"All", img:"https://funcakes.com/content/uploads/2023/06/Ice-cream-recipe-600x450.webp", test:"Check for washing powder foam", review:"Non-edible fats used",video:"https://youtube.com/shorts/rYe-b_0hWK8?si=mwr_TWc-sn-6K1t7", experiences:[]},
    {name:"Soft Drinks",category:"Drinks", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFg8xAxADTOXto6UntGguvQ8VOI9eNlDg9w&s", test:"Check excessive fizz", review:"Artificial color excess", experiences:[]},
    {name:"Fruits",category:"All", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-Wzl5Dq6K2jyuBKMj0em4G6bpfGBBEDNAA&s", test:"Dip in water, remove wax",video:"https://youtube.com/shorts/66c39D3aN68?si=KV9hT7AcAGD5LtHP", review:"Wax coating common", experiences:[]},
    {name:"Bread",category:"All", img:"https://theloopywhisk.com/wp-content/uploads/2024/08/Gluten-Free-Sandwich-Bread_1200px-2.jpg", test:"Check for smell",video:"https://youtube.com/shorts/Gq-kATANtMw?si=2lxSMvBXeP66vW1N", review:"Potassium bromate use",experiences:[]},
    {name:"Rice",category:"Grains", img:"https://cdn.prod.website-files.com/66e9e86e939e026869639119/66fc4e47b5d69fb0deb88654_iStock-153737841-scaled.jpeg",video:"https://youtube.com/shorts/1CiFbxQxVvg?si=8trFZIOD45VGpVNv", test:"Burn to smell plastic", review:"Plastic rice incidents", experiences:[]},
    {name:"Wheat Flour",category:"All", img:"https://5.imimg.com/data5/SELLER/Default/2024/3/403407725/MP/DS/JU/6846833/natural-wheat-flour-500x500.jpg", test:"Check for chalk powder",video:"https://youtube.com/shorts/lYdlROTOWe4?si=hUGv8mlk2aXsBJiU.mp4", review:"Chalk mixed for weight", experiences:[]}
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
// ===== Quiz Feature =====

const quizData = [

{
question:"Which adulterant is commonly found in milk?",
answers:[
"Water",
"Salt",
"Plastic",
"Sand"
],
correct:0
},

{
question:"Lead chromate is added in?",
answers:[
"Sugar",
"Tea",
"Turmeric",
"Honey"
],
correct:2
},

{
question:"Artificial colors are mostly found in?",
answers:[
"Soft Drinks",
"Rice",
"Salt",
"Ghee"
],
correct:0
}

];

let currentQuestion = 0;

const questionEl =
document.getElementById("question");

const answersEl =
document.getElementById("answers");

const nextBtn =
document.getElementById("nextQuestion");

function loadQuestion(){

    const q =
    quizData[currentQuestion];

    questionEl.textContent =
    q.question;

    answersEl.innerHTML = "";

    q.answers.forEach((ans,index)=>{

        const btn =
        document.createElement("button");

        btn.textContent = ans;

        btn.addEventListener("click",()=>{

            if(index === q.correct){
                alert("Correct!");
            } else {
                alert("Wrong!");
            }

        });

        answersEl.appendChild(btn);

    });

}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion >= quizData.length){
        currentQuestion = 0;
    }

    loadQuestion();

});

loadQuestion();
