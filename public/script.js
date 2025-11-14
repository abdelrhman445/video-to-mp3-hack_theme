class DarkPortalConverter {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.checkServerStatus();
        this.loadSupportedPlatforms();
        this.initializeCreepyEffects();
    }

    initializeElements() {
        // عناصر الإدخال
        this.videoUrlInput = document.getElementById('videoUrl');
        this.qualitySelect = document.getElementById('quality');
        this.getInfoBtn = document.getElementById('getInfoBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.pasteBtn = document.getElementById('pasteBtn');

        // عناصر العرض
        this.videoInfoDiv = document.getElementById('videoInfo');
        this.loadingDiv = document.getElementById('loading');
        this.resultDiv = document.getElementById('result');
        this.errorDiv = document.getElementById('error');

        // عناصر معلومات الفيديو
        this.thumbnailImg = document.getElementById('thumbnail');
        this.videoTitle = document.getElementById('videoTitle');
        this.videoDuration = document.getElementById('videoDuration');
        this.videoPlatform = document.getElementById('videoPlatform');
        this.videoAuthor = document.getElementById('videoAuthor');

        // عناصر النتائج
        this.resultMessage = document.getElementById('resultMessage');
        this.fileSize = document.getElementById('fileSize');
        this.fileDuration = document.getElementById('fileDuration');
        this.downloadLink = document.getElementById('downloadLink');

        // عناصر الخطأ
        this.errorMessage = document.getElementById('errorMessage');

        // حالة الخادم
        this.serverStatus = document.getElementById('serverStatus');

        // رسائل مخيفة
        this.creepyMessage = document.getElementById('creepyMessage');
    }

    attachEventListeners() {
        this.getInfoBtn.addEventListener('click', () => this.getVideoInfo());
        this.downloadBtn.addEventListener('click', () => this.downloadMP3());
        this.pasteBtn.addEventListener('click', () => this.pasteFromClipboard());

        // إدخال رابط يدويًا
        this.videoUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.getVideoInfo();
            }
        });

        // تحديث شريط التقدم أثناء التحميل
        this.setupProgressAnimation();
    }

    initializeCreepyEffects() {
        this.createCreepyElements();
        setTimeout(() => this.showRandomMessage(), 10000);
        
        // تأثيرات عند التمرير
        window.addEventListener('scroll', () => {
            this.playSubtleSound();
        });
    }

    async pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            this.videoUrlInput.value = text;
            this.showCreepyMessage('تم لصق الرابط بنجاح... لكن هل تعلم من كان يراقبك؟');
        } catch (error) {
            this.showCreepyMessage('تعذر الوصول إلى الحافظة... ربما هناك من يمنعنا');
        }
    }

    async getVideoInfo() {
        const url = this.videoUrlInput.value.trim();
        
        if (!url) {
            this.showError('يرجى إدخال رابط الفيديو... العالم الآخر ينتظر');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('رابط غير صالح. يرجى إدخال رابط صحيح... الأرواح تحتاج إلى بوابات صحيحة');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResult();
        this.hideVideoInfo();

        try {
            // إضافة تأثيرات مرعبة أثناء الانتظار
            this.showCreepyMessage('جاري الاتصال بالعالم الآخر... لا تتحرك كثيراً');

            const response = await fetch('/api/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoUrl: url })
            });

            const data = await response.json();

            if (data.success) {
                this.showCreepyMessage('تم العثور على الفيديو... لكن هل كان وحيداً؟');
                this.displayVideoInfo(data.data);
            } else {
                this.showError(data.error || 'حدث خطأ في جلب معلومات الفيديو... ربما المقاومة كانت قوية');
            }
        } catch (error) {
            this.showError('حدث خطأ في الاتصال بالخادم... الأرواح ترفض التواصل');
        } finally {
            this.hideLoading();
        }
    }

    async downloadMP3() {
        const url = this.videoUrlInput.value.trim();
        const quality = this.qualitySelect.value;

        this.showLoading();
        this.hideError();
        this.hideResult();

        try {
            this.showCreepyMessage('جاري استحضار الصوت... لا تنظر إلى الظلال');

            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    videoUrl: url,
                    quality: quality
                })
            });

            const data = await response.json();

            if (data.success) {
                this.showCreepyMessage('الصوت هنا... هل تسمع الهمسات أيضاً؟');
                this.showResult(data.data);
            } else {
                this.showError(data.error || 'حدث خطأ في التحويل... القوى المعادية تعترضنا');
            }
        } catch (error) {
            this.showError('حدث خطأ في الاتصال بالخادم... البوابة مغلقة');
        } finally {
            this.hideLoading();
        }
    }

    displayVideoInfo(info) {
        this.thumbnailImg.src = info.thumbnail;
        this.videoTitle.textContent = info.title;
        this.videoDuration.textContent = this.formatDuration(info.duration);
        this.videoPlatform.textContent = info.platform;
        this.videoAuthor.textContent = info.author || 'غير معروف... أو غير مرئي';
        
        this.videoInfoDiv.classList.remove('hidden');
        this.scrollToElement(this.videoInfoDiv);
    }

    showResult(data) {
        this.resultMessage.textContent = 'تم التحويل بنجاح!... الصوت الآن معنا';
        this.fileSize.textContent = `حجم الملف: ${this.formatFileSize(data.fileSize)}`;
        this.fileDuration.textContent = `المدة: ${this.formatDuration(data.duration)}`;
        this.downloadLink.href = data.downloadUrl;
        this.downloadLink.download = data.fileName;
        
        this.resultDiv.classList.remove('hidden');
        this.scrollToElement(this.resultDiv);
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorDiv.classList.remove('hidden');
        this.scrollToElement(this.errorDiv);
    }

    showLoading() {
        this.loadingDiv.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingDiv.classList.add('hidden');
    }

    hideError() {
        this.errorDiv.classList.add('hidden');
    }

    hideResult() {
        this.resultDiv.classList.add('hidden');
    }

    hideVideoInfo() {
        this.videoInfoDiv.classList.add('hidden');
    }

    async checkServerStatus() {
        try {
            const response = await fetch('/api/status');
            const data = await response.json();
            
            if (data.success) {
                this.serverStatus.textContent = '● متصل';
                this.serverStatus.className = 'status-indicator online';
            } else {
                throw new Error('Server not responding properly');
            }
        } catch (error) {
            this.serverStatus.textContent = '● غير متصل';
            this.serverStatus.className = 'status-indicator offline';
        }
    }

    async loadSupportedPlatforms() {
        try {
            const response = await fetch('/api/platforms');
            const data = await response.json();
            
            if (data.success) {
                this.displayPlatforms(data.platforms);
            }
        } catch (error) {
            console.error('Failed to load platforms:', error);
            // عرض المنصات الافتراضية في حالة الخطأ
            this.displayPlatforms(['YouTube', 'Facebook', 'Instagram', 'TikTok', 'Twitter', 'SoundCloud']);
        }
    }

    displayPlatforms(platforms) {
        const platformsGrid = document.getElementById('platformsList');
        platformsGrid.innerHTML = platforms.map(platform => 
            `<div class="platform-tag">${platform}</div>`
        ).join('');
    }

    setupProgressAnimation() {
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            setInterval(() => {
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 100);
            }, 2000);
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    formatDuration(seconds) {
        if (!seconds || seconds === 0) return 'غير معروف... أو خارج الزمن';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    formatFileSize(bytes) {
        if (!bytes) return 'غير معروف... كأنه شبح';
        
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    scrollToElement(element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    showCreepyMessage(message) {
        this.creepyMessage.textContent = message;
        this.creepyMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.creepyMessage.classList.add('hidden');
        }, 5000);
    }

    createCreepyElements() {
        const background = document.querySelector('.background-elements');
        
        // إنشاء عيون إضافية
        for (let i = 0; i < 5; i++) {
            const eye = document.createElement('div');
            eye.className = 'floating-eyes';
            eye.style.top = `${Math.random() * 90}%`;
            eye.style.left = `${Math.random() * 90}%`;
            eye.style.animationDelay = `${Math.random() * 20}s`;
            background.appendChild(eye);
        }
        
        // إنشاء قطرات دم إضافية
        for (let i = 0; i < 10; i++) {
            const drip = document.createElement('div');
            drip.className = 'blood-drips';
            drip.style.left = `${Math.random() * 100}%`;
            drip.style.animationDelay = `${Math.random() * 8}s`;
            background.appendChild(drip);
        }
    }

    showRandomMessage() {
        const messages = [
            "أشعر أن هناك من يراقبنا...",
            "هل سمعت ذلك الصوت أيضاً؟",
            "الأبواب تتحرك من تلقاء نفسها...",
            "أنت لست وحيداً هنا...",
            "لا تثق بظلالك...",
            "الوقت يمر ببطء في هذا المكان...",
            "أحياناً أرى أشياء تتحرك من زاوية عيني...",
            "هل تشعر بالبرودة أيضاً؟",
            "الأصوات تهمس من الجدران...",
            "الظلام يتكلم بلغة لا أفهمها..."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showCreepyMessage(randomMessage);
        
        // جدولة الرسالة التالية عشوائياً
        setTimeout(() => this.showRandomMessage(), Math.random() * 30000 + 20000);
    }

    playSubtleSound() {
        // في تطبيق حقيقي، يمكن إضافة تأثيرات صوتية خفية هنا
    }
}

// وظيفة مساعدة عامة
function hideError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.add('hidden');
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new DarkPortalConverter();
});

// تحديث حالة الخادم كل 30 ثانية
setInterval(() => {
    const converter = new DarkPortalConverter();
    converter.checkServerStatus();
}, 30000);