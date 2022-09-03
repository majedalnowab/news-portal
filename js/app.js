const navUl = () => {
    const ul = document.getElementsByClassName("nav-ul");
    const navItems = ["News", "Blog"];
    for (let i = 0; i < ul.length; i++) {
        navItems.forEach((navItem) => {
            const href = ["index.html", "blog.html", "#", "#"];
            const li = document.createElement("li");
            li.innerHTML = `
             <a href="${href[navItems.indexOf(navItem)]}">${navItem}</a>
          `;
            console.log();
            ul[i].appendChild(li);
        });
    }
};
navUl();

const isLoading = (data) => {
    const loader = document.getElementById("loader");
    if (data) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
};

const categoryFetch = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const info = await res.json();
    categoryShow(info.data.news_category);
};