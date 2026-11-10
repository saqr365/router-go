# Router Go — الموقع (ملاحظات النشر والصيانة)

موقع ثابت (HTML/CSS/JS) جاهز للرفع على **GitHub Pages**. مفيش أدوات بناء ولا npm.

## الهيكل

```
index.html  privacy.html  404.html
manifest.webmanifest   sw.js          (خاصية التثبيت + العمل بدون إنترنت)
robots.txt  sitemap.xml  .nojekyll
css/     fonts · tokens · style · privacy · 404
js/      ui · motion · device-hint · sticky-cta · mailto · pwa · privacy · theme-init
assets/  fonts · img · icons
downloads/   ← مش بيتحط فيه ملفات: التطبيقات بتترفع في GitHub Releases (تحت)
```

## النشر على GitHub Pages

1. اعمل مستودع باسم `router-go` تحت حساب `saqr365` وارفع كل محتويات الفولدر ده في الجذر.
2. التطبيقات (APK وEXE) **مش بتترفع مع الموقع**: بتترفع في Release (قسم «التطبيقات» تحت)، وزرّار التحميل في `index.html` بيشاوروا عليها.
3. من **Settings → Pages**: Source = *Deploy from a branch*، الفرع `main`، والمجلد `/ (root)`.
4. الموقع هيشتغل على `https://saqr365.github.io/router-go/`.

## التطبيقات (GitHub Releases)

زرّار «تحميل APK» و«تحميل EXE» بيشاوروا على:

- `https://github.com/saqr365/router-go/releases/latest/download/router-go.apk`
- `https://github.com/saqr365/router-go/releases/latest/download/RouterGo-Setup.exe`

الرابط `latest/download/<اسم الملف>` بيفتح أحدث Release لوحده، فمش محتاج تغيّر الروابط مع كل إصدار. بس **اسم الملف لازم يفضل زي ما هو بالظبط** (`router-go.apk` و`RouterGo-Setup.exe`).

لإنشاء Release: من المستودع اضغط **Releases ثم Draft a new release**، اكتب Tag زي `v0.7.4` وعنوان، واسحب الملفين من `dist\downloads` (بعد `tools\build_all.ps1`)، واضغط **Publish release**. متحطّش ملف الـ AAB ولا مفتاح التوقيع ولا ملفات النسخة الاحتياطية.

## لو اسم المستودع أو الدومين مختلف

الروابط المطلقة (صورة المشاركة، canonical، sitemap، robots، و`<base>` في `404.html`) مكتوبة على `https://saqr365.github.io/router-go/`. غيّرها كلها بأمر واحد:

```bash
grep -rl "saqr365.github.io/router-go" . | xargs sed -i 's#https://saqr365.github.io/router-go/#https://YOUR-SITE/#g'
sed -i 's#<base href="/router-go/">#<base href="/">#' 404.html   # لو الدومين على الجذر
```

## خاصية التثبيت (PWA)

- زر التثبيت (أيقونة + في الفوتر) بيظهر لوحده لما المتصفح يسمح (كروم/إيدج/أندرويد). على iPhone بيفتح شرح «إضافة إلى الشاشة الرئيسية».
- الموقع بيشتغل أوفلاين (الصفحة الرئيسية والخصوصية)، وملفات `downloads/` عمرها ما بتتخزّن.
- لازم HTTPS (GitHub Pages فيه). عند كل إصدار غيّر `VERSION` في أول `sw.js`.

## تجربة محلية

```bash
python3 -m http.server 8000      # وافتح http://localhost:8000
```

## عند إصدار جديد

غيّر رقم الإصدار في: `index.html` (كارتي التحميل والفوتر)، و`sitemap.xml` (lastmod)، و`VERSION` في `sw.js`، وبعدين اعمل Release جديد بنفس أسماء الملفات.

لو غيّرت اسم المستودع أو الحساب، غيّر كمان رابطي `releases/latest/download/` في `index.html`.
