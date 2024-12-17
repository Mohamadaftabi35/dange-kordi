// ======================navbar toggle========================
const btn = document.querySelector(".mobile-menu-button");
            const menu = document.querySelector(".mobile-menu");
    
            btn.addEventListener("click", () => {
                menu.classList.toggle("hidden");
            });
    
            window.addEventListener("scroll", () => {
                if (!menu.classList.contains("hidden")) {
                    menu.classList.add("hidden");
                }
            });
//=============================navbar click heddin===================================
const navlink = document.querySelectorAll('.navlink');

const navLink = () =>{
    const navmenu = document.querySelector('.menu-mobuil');
    navmenu.classList.remove('show')
}

navlink.forEach(e => e.addEventListener("click" , navLink));

// ======================================Message===================================
const form = document.getElementById('commentForm');
        const nameInput = document.getElementById('nameInput');
        const imageInput = document.getElementById('imageInput');
        const commentInput = document.getElementById('commentInput');
        const commentsDiv = document.getElementById('comments');

        // بارگذاری نظرات از localStorage
        const loadComments = () => {
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.forEach(comment => {
                displayComment(comment);
            });
        };

        // نمایش نظر
        const displayComment = (comment) => {
            const commentElement = document.createElement('div');
            commentElement.className = 'p-4 bg-gray-50 border border-gray-200 rounded-lg relative';

            const userHeader = document.createElement('div');
            userHeader.className = 'flex items-center mb-2';

            const userImage = document.createElement('img');
            userImage.src = comment.image; // تصویر بارگذاری شده
            userImage.alt = comment.name;
            userImage.className = 'w-10 h-10 rounded-full mr-2';

            const userName = document.createElement('span');
            userName.className = 'font-bold';
            userName.textContent = comment.name;

            const commentDate = document.createElement('span');
            commentDate.className = 'text-gray-500 text-sm ml-2';
            commentDate.textContent = new Date(comment.date).toLocaleString('fa-IR'); // نمایش تاریخ به فرمت فارسی

            userHeader.appendChild(userImage);
            userHeader.appendChild(userName);
            userHeader.appendChild(commentDate);
            commentElement.appendChild(userHeader);

            const commentTextElement = document.createElement('p');
            commentTextElement.textContent = comment.commentText;
            commentElement.appendChild(commentTextElement);

            // دکمه حذف
            const deleteButton = document.createElement('button');
            deleteButton.className = 'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg';
            deleteButton.textContent = 'حذف';
            deleteButton.onclick = () => {
                removeComment(comment.date); // حذف کامنت از localStorage
                commentElement.remove(); // حذف کامنت از صفحه
            };
            commentElement.appendChild(deleteButton);

            commentsDiv.prepend(commentElement); // اضافه کردن نظر جدید در بالای لیست
        };

        // به‌روزرسانی localStorage
        const updateLocalStorage = (newComment) => {
            let comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.unshift(newComment); // اضافه کردن نظر جدید در ابتدای آرایه
            localStorage.setItem('comments', JSON.stringify(comments)); // ذخیره‌سازی آرایه جدید در localStorage
        };

        // حذف یک کامنت از localStorage
        const removeComment = (commentDate) => {
            let comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments = comments.filter(comment => comment.date !== commentDate); // حذف کامنت بر اساس تاریخ
            localStorage.setItem('comments', JSON.stringify(comments)); // ذخیره‌سازی آرایه جدید در localStorage
        };

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // جلوگیری از ارسال فرم

            const name = nameInput.value.trim();
            const commentText = commentInput.value.trim();
            const imageFile = imageInput.files[0];

            if (name && commentText && imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const image = e.target.result;
                    const newComment = {
                        name: name,
                        commentText: commentText,
                        image: image,
                        date: new Date().toISOString() // ذخیره تاریخ
                    };

                    // ذخیره نظر جدید در localStorage
                    updateLocalStorage(newComment); // به‌روزرسانی localStorage

                    // نمایش نظر جدید
                    displayComment(newComment);

                    // پاک کردن ورودی‌ها
                    nameInput.value = '';
                    commentInput.value = '';
                    imageInput.value = '';
                };
                reader.readAsDataURL(imageFile); // خواندن تصویر
            }
        });

        // بارگذاری نظرات هنگام بارگذاری صفحه
        loadComments();