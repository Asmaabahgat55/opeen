const cities = ["القاهرة", "الإسكندرية", "الجيزة", "القليوبية", "الدقهلية", "الغربية", "الشرقية", "المنوفية", "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد", "الإسماعيلية", "السويس", "الفيوم", "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان"];

// حفظ البيانات الأساسية في localStorage للانتقال للمرحلة الثانية
function saveBasicInfoAndNext() {
    const role = document.querySelector('input[name="role"]:checked').value;
    const basicInfo = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        role: role
    };
    
    if(!basicInfo.name || !basicInfo.email || !basicInfo.phone) {
        alert("برجاء ملء البيانات الأساسية أولاً");
        return;
    }

    localStorage.setItem('currentStep1', JSON.stringify(basicInfo));
    window.location.href = role === 'student' ? 'student.html' : 'teacher.html';
}

// إظهار المحافظات عند اختيار أوفلاين
function handleModeChange(val, divId) {
    const div = document.getElementById(divId);
    if(val === 'offline' || val === 'yes') {
        div.classList.remove('hidden');
        const cityList = div.querySelector('.city-list');
        if(cityList.options.length <= 1) {
            cities.forEach(c => cityList.add(new Option(c, c)));
        }
    } else {
        div.classList.add('hidden');
    }
}

// إرسال البيانات النهائية للأدمن (تخزين في مصفوفة بـ localStorage)
function submitToAdmin(role) {
    const step1 = JSON.parse(localStorage.getItem('currentStep1'));
    let details = {};

    if(role === 'student') {
        details = {
            stage: document.getElementById('stStage').value,
            subject: document.getElementById('stSubject').value,
            mode: document.getElementById('stMode').value,
            city: document.getElementById('stCity').value,
            area: document.getElementById('stArea').value,
            price: document.getElementById('stPrice').value
        };
    } else {
        details = {
            subject: document.getElementById('trSubject').value,
            stage: document.getElementById('trStage').value,
            mode: document.getElementById('trMode').value,
            city: document.getElementById('trCity').value,
            area: document.getElementById('trArea').value
        };
    }

    const finalData = {...step1, ...details};
    
    // حفظ في مصفوفة الطلبات
    const allRequests = JSON.parse(localStorage.getItem('academyRequests') || '[]');
    allRequests.push(finalData);
    localStorage.setItem('academyRequests', JSON.stringify(allRequests));

    alert("تم إرسال طلبك بنجاح للأدمن!");
    window.location.href = 'index.html';
}