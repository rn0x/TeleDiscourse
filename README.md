<div align="center">

جسر بين منصة Discourse و Telegram.
يتم إستعمال واجهة برمجة تطبيقات المستخدم user-api-keys


<br>

# مميزات الجسر

</div>

- عرض آخر موضوع تم نشره 📄
- عرض الفئات ⬇️
- كتابة موضوع جديد 📝
- كتابة تعليق جديد 💬
- إرسال رسالة خاصة 🔒
- ربط حسابك على منصة Discourse 
- تفعيل البوت لتلقي آخر المواضيع المنشورة


<div align="center">

<br>

|  الأمر  | صورة|
|:--------------|-----------------:|
|start | ![TeleDiscourse](/README/1.jpg) |
|get_latest_posts | ![TeleDiscourse](/README/2.jpg) |
|getCategories | ![TeleDiscourse](/README/3.jpg) |
|CreatePosts | ![TeleDiscourse](/README/4.jpg) |
|sendComment | ![TeleDiscourse](/README/5.jpg) |
|sendMessagePrivate | ![TeleDiscourse](/README/6.jpg) |
|discourse | ![TeleDiscourse](/README/7.jpg) |
|activation | ![TeleDiscourse](/README/8.jpg) |

<br>


# تثبيت البوت 

```bash
git clone https://github.com/rn0x/TeleDiscourse
cd TeleDiscourse
nano config.json
npm i
npm start
```

**config.json**

</div>

```json
{
    "url": "https://discourse.aosus.org",
	"title_discourse": "مجتمع أسس",
	"token_telegram": "1577928719:AAHM8SKmPzb0ctekN_Nhyjs_9eiMvs0-Iw",
	"language": "ar"
}
```
