let Health = 100;
let currentWeapon = 'Chổi';
let coins = 0;
let fightIndex;
let audio;
let monsterhealth;
let sungindex=0;
let currentWeaponIndex=0;
let damageUser;
let parryPercent;
const boss = document.querySelector("#boss");
const khungthanhmau = document.querySelector("#khungthanhmau");

function playMusicMenu(){
    audio = new Audio("menumusic.mp3");
    audio.play();
}

window.addEventListener("load", playMusicMenu);


function playMusicHome(){
   
    audio.pause();
    audio.currentTime = 0;  

    audio = new Audio("phongngu.mp3");
    audio.play();
}



function playMusicFightMaid(){
    let audio = new Audio("fightmaid.mp3");
    audio.play();
}


const userHealth = document.querySelector('#userHealth');
const HealthText = document.querySelector('#HealthText');

const userWeapon = document.querySelector('#userWeapon');
const currentWeaponText = document.querySelector('#currentWeaponText');

const userCoins= document.querySelector('#userCoins');
const coinsText = document.querySelector('#coinsText');

const monsterStats = document.querySelector('#monsterStats');
const monsterHealthText = document.querySelector('#monsterHealthText');

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');

const menuText = document.querySelector('#menuText');

const textDiv = document.querySelector('#textDiv');
const text = document.querySelector('#text');


const weapons =[
    {name: "Chổi", power: 1},
    {name: "Cây lao nhà", power: 2},
    {name: "Kiếm", power: 5},
    {name: "Súng", power: 15}
];

const monsters=[
    {
    name: 'thùng rác',
    attack: 10,
    health: 10,
    coins : 30
    },
    {
    name: 'Tôm',
    attack: 20,
    health: 20,
    coins : 100
    },
    {
    name: 'Otaku',
    attack: 50,
    health: 400,
    coins : 400
    }
];


const locations = [
    {
        name: "phongngu",
        "buttonText" : ["Cửa Hàng", "Khám phá", "Ra hành lang"],
        "buttonFunction" : [goStore, goExplore, lobby],
        text: "Bạn đang ở phòng ngủ của mình, bên ngoài chính là bữa tiệc của một tên Otaku, bạn nên có một loại vũ khí xịn trước khi đối mặt với nó."
    },
    {
        name: "explore",
        "buttonText" : ["Vào nhà vệ sinh", "Tiêu diệt thùng rác", "Trở lại giường ngủ"],
        "buttonFunction" : [goToilet, goFightTrash, playgame],
        text: "Bạn gặp một thùng rác chứa đầy vàng và báo vật, có lẽ đã được cho xem anime nên bây giờ nó đã biết tấn công."
    },
    {
        name: "fight",
        "buttonText" : ["Tấn công", "Đỡ đòn", "Trở về"],
        "buttonFunction" : [attack, parry, playgame],
        text: "Bạn đang trong trận chiến."
    },
    {
        name: "defectmonster",
        "buttonText" : ["Cửa hàng", "Đánh lại lần nữa", "Trở về"],
        "buttonFunction" : [goStore, goFight, playgame],
        text: "Bạn đã đánh bại Quái, nó la lên á á á! Sau đó rơi ra cho bạn vàng mà nó đã giấu."
    },
    {
        name: "Shopping",
        "buttonText" : ["10 máu 5 vàng", "Vũ khí 30 vàng", "Trở về"],
        "buttonFunction" : [BuyHealth, BuyWeapon, playgame],
        text: "Bạn đi đến cửa sỗ và gặp một sinh vật huyền bí, nó yêu cầu 1 ít vàng để trao đổi."
    },
    {
        name: "khu vườn",
        "buttonText" : ["Cửa hàng", "Tiêu diệt con Tôm", "Trở về"],
        "buttonFunction" : [goStore, goFIghtShrimp,goExplore],
        text: "Nhà vệ sinh đã biến thành một không gian hoàn toàn khác, bạn lờ mờ thấy 1 sinh vật to khỏe kì dị nhìn gần giống con tôm."
    },
    {
        name: "hành lang",
        "buttonText" : ["Cửa hàng", "Tiêu diệt Otaku", "Trở về"],
        "buttonFunction" : [goStore, goFightBoss,goExplore],
        text: "Bạn gặp Otaku (trùm cuối) đang đứng cuối hành lang. Hãy suy nghĩ kĩ trước khi đánh với tên này."
    }
    
   
];


function update(location){
    monsterStats.style.display = "none";                            /**/ 
    btn1.innerText = location["buttonText"][0];
    btn3.innerText = location["buttonText"][1];
    btn4.innerText = location["buttonText"][2];                     /*location là địa điểm đã truyền vào*/
    btn1.onclick = location["buttonFunction"][0];
    btn3.onclick = location["buttonFunction"][1];
    btn4.onclick = location["buttonFunction"][2];
    text.innerHTML = location.text;
}
function reset(){
    Health = 100;
    currentWeapon = 'Chổi';
    coins = 0;
    sungindex=0;
    currentWeaponIndex=0;
    playgame();
}
function playgame() {
    
    boss.style.display ="none";
    khungthanhmau.style.display ="none";

    monsterStats.style.display = "none";
    document.body.style.backgroundImage ="url('phongngu.jpg')";
    btn2.style.display = "none";
    menuText.style.display = "none";

    textDiv.style.display = "block";
    btn1.style.display = "block";
    btn3.style.display = "block";
    btn4.style.display = "block";

    userHealth.style.display = "block";
    userWeapon.style.display = "block";
    userCoins.style.display = "block";

    HealthText.innerHTML = Health;
    currentWeaponText.innerHTML = currentWeapon;
    coinsText.innerHTML = coins;

    update(locations[0]);
    playMusicHome();

}
btn2.onclick = reset;

function goStore(){

    
    audio.pause();

// Tạo một đối tượng Audio mới
    audio = new Audio("shop.mp3");

// Lắng nghe sự kiện 'loadedmetadata' để đảm bảo nhạc đã sẵn sàng
    audio.addEventListener('loadedmetadata', function() {
        // Đặt thời gian bắt đầu từ giây thứ 28 khi file đã tải đủ thông tin
        audio.currentTime = 28;

       
        audio.play();

        document.body.style.backgroundImage ="url('shoping.jpg')";
        update(locations[4]);
    });

}
function BuyHealth(){
    if(coins >= 5){
        coins -= 5;
        coinsText.innerHTML = coins;
        text.innerHTML = "Bạn vừa trao đổi được 10 máu";

        Health+= 10;
        HealthText.innerHTML = Health;

    }else{
        text.innerHTML = "Bạn không đủ tiền";
    }
}
function BuyWeapon(){
    if(coins >= 30 && (currentWeaponIndex < 2 || (sungindex === 1 && currentWeaponIndex < 3) ) ){
        
        coins -= 30;
        coinsText.innerHTML = coins;
        currentWeaponIndex++;
        currentWeapon = weapons[currentWeaponIndex].name;
        text.innerHTML = "Bạn vừa mua được "+currentWeapon+".";
        currentWeaponText.innerHTML = currentWeapon;
    
    }
    else if(coins < 30){
        text.innerHTML = "Bạn không đủ tiền."
    }
    else{
        text.innerHTML = "Bạn đã có vũ khí mạnh nhất hiện tại."
    }
}
function goExplore(){
    document.body.style.backgroundImage ="url('khamphasotrac(1)(1).png')";
    update(locations[1]);
}
function goFight(){
    update(locations[2]);                                           /* update location trước để display monsterStat */
    monsterStats.style.display ="block";
    monsterhealth = monsters[fightIndex].health;
    monsterHealthText.innerHTML = monsterhealth;
    
}
function goFightTrash(){
    fightIndex=0;
    goFight();
    
}
function goToilet(){
    audio.pause();
    audio.currentTime = 0;

    audio = new Audio("huyenbimusic.mp3");
    audio.play();
    document.body.style.backgroundImage ="url('khuvuonhuyenbi.jpg')";
    update(locations[5]);
}
function goFIghtShrimp(){
    document.body.style.backgroundImage ="url('danhtom3.png')";
    fightIndex = 1;

    audio.pause();
    audio.currentTime = 0;

    audio = new Audio("danhtommusic.mp3");
    audio.play();
    goFight();
}
function lobby(){
    document.body.style.backgroundImage ="url('hanhlang.jpg')";
    

    audio.pause();
    audio.currentTime = 0;

    audio = new Audio("hanhlangmusic.mp3");
    audio.play();
    update(locations[6]);
}
function goFightBoss(){
    fightIndex = 2;
    document.body.style.backgroundImage ="url('danhboss.jpg')";
    
    boss.style.display ="block";
    khungthanhmau.style.display = "block";
    
    audio.pause();
    audio.currentTime = 0;

    audio = new Audio("bossmusic.mp3");
    audio.play();
    goFight();
    
    btn4.onclick = run;

}

function triggerHitEffect() {
    const img = document.getElementById("bossimg");

// Để reset animation, xóa class rồi thêm lại sau 100ms
    img.classList.remove("shake", "flash");

// Chờ 100ms rồi thêm lại class để chạy animation
    setTimeout(() => {
        img.classList.add("shake", "flash");
    }, 30); // Tăng lên 100ms để đảm bảo reset animation
}

function updateStats(){
    HealthText.innerHTML = Health;
    monsterHealthText.innerHTML = monsterhealth;
}

function attack(){
    text.innerHTML = "Bạn đã đánh "+monsters[fightIndex].name+" bằng "+weapons[currentWeaponIndex].name+".";
    let monsterdamage = Math.floor(Math.random()*monsters[fightIndex].attack+1);
    Health -= monsterdamage;
    text.innerHTML += " Nó đánh bạn mất "+monsterdamage+" máu."
    
    damageUser = Math.floor(Math.random()*weapons[currentWeaponIndex].power+1);
    monsterhealth -= damageUser;
    
    updateStats();
    text.innerText +=" Bạn đánh nó mất "+damageUser+" máu."
    updateWinLose();
}
function updateWinLose(){
    if(Health<=0){
        lose();
    }
    else if(monsterhealth<=0){
        if(fightIndex===1){
            defeatMonster();
            text.innerHTML += "Bạn nhặn được mảnh súng.";
            sungindex = 1;
        }
        else if(fightIndex===2){
            wingame();
        }
        else {
            defeatMonster();
        }
    }
    else if( fightIndex === 2){
            /**/ 

        document.getElementById("thanhmau").style.width = monsterhealth+"px";
        triggerHitEffect();
    }
}
function breakWeapon() {
    text.innerHTML = currentWeapon+" của bạn đã bị hỏng."
    currentWeaponIndex--;
    currentWeapon = weapons[currentWeaponIndex].name;
    currentWeaponText.innerHTML = currentWeapon;
    
}
function parry(){
    parryPercent = Math.floor(Math.random()*10+1);
    if (parryPercent < 3 && currentWeaponIndex !== 0) {
        damageUser = Math.floor(Math.random()*weapons[currentWeaponIndex].power+1);
        monsterhealth -= damageUser;
        updateStats();
        breakWeapon();
        text.innerText +=" Bạn đánh nó mất "+damageUser+" máu."
        updateWinLose();
    }
    else if(currentWeaponIndex === 0){
        text.innerHTML = "Bạn đã đỡ đòn."
    }    
    else{
    damageUser = Math.floor(Math.random()*weapons[currentWeaponIndex].power+1);
    monsterhealth -= damageUser;
    updateStats();
    text.innerText =" Bạn đánh nó mất "+damageUser+" máu."
    updateWinLose();
    }
}
function lose(){
    btn1.style.display = "none";
    btn3.style.display = "none";
    btn4.style.display = "none";
    
    btn2.style.display = "block";
    btn2.innerText = "Chơi lại";
    text.innerHTML = "Bạn đã chết.";


}
function defeatMonster(){
    coins += monsters[fightIndex].coins;
    coinsText.innerHTML = coins;
    update(locations[3]);

}
function wingame(){
    btn1.style.display = "none";
    btn3.style.display = "none";
    btn4.style.display = "none";
    
    btn2.style.display = "block";
    btn2.innerText = "Chơi lại";
    text.innerHTML = "Chúc mừng! Bạn vừa hoàn thành trò chơi. Bạn đã đánh bại tên Otaku thành công, bây giờ chính là lúc bạn nên đi khám bác sĩ chữa bệnh hoang tưởng. ";
}
function run(){
    text.innerHTML = "Bạn không thể quay lại được nữa."
}
