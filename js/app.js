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


const categoryFetch = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const info = await res.json();
    categoryShow(info.data.news_category);
};
const categoryShow = (data) => {
    const aCategory = [{ category_id: "08", category_name: "Home" }, ...data];
    const categoryUl = document.getElementById("category-ul");
    aCategory.forEach((single) => {
        const li = document.createElement("li");
        li.setAttribute("onclick", `categoryCards(${single.category_id})`);
        li.innerHTML = `<a>${single.category_name}</a>`;
        categoryUl.appendChild(li);
        // console.log(li);
    });
};
categoryFetch();

// return async be careful!
const categoryPage = async (data) => {
    isLoading(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/0${data}`;
    const res = await fetch(url);
    const info = await res.json();
    const categoryCard = document.getElementById("category-card");
    categoryCard.innerHTML = ``;
    return info.data;
};
const categoryCards = async (data) => {
    const info = await categoryPage(data);
    const itemFound = document.getElementById("item-found");
    itemFound.innerText = `${info.length > 1 ? info.length + " items found" : "No Data Found"}`;
    // console.log(info.length);
    if (info.length < 1) {
        console.log("yes");
        const categoryCard = document.getElementById("category-card");
        const div = document.createElement("div");
        div.innerHTML = `
       <h3 class="text-center text-3xl font-bold text-red-600">No News Found in this page!</h3>
       `;
        categoryCard.appendChild(div);
    }
    info.sort(function (a, b) {
        return b.total_view - a.total_view;
    });
    info.forEach((single) => {
        // console.log(single);
        // author ---> name, img, published_date
        const { author, details, title, total_view, image_url: image, _id: id } = single;
        const categoryCard = document.getElementById("category-card");
        const div = document.createElement("div");
        // console.log(total_view);
        div.classList.add("card", "card-side", "shadow-lg", "drop-shadow-xl", "rounded-md", "grid", "grid-cols-12", "mb-2");

        div.innerHTML = `
          <figure class="col-span-12 md:col-span-4 p-3"><img class="min-h-full min-w-full rounded-lg" src=${image} alt="Movie" /></figure>
          <div class="card-body col-span-12 md:col-span-8">
             <h2 class="card-title font-bold">${title ?? "No Title Found"}</h2>
             <p class="font-medium text-gray-600">${details.slice(0, 300) + "....."}</p>
             <div class="card-actions justify-between items-center gap-5 pt-5">
                <div class="flex gap-4 items-center">
                   <div class="avatar">
                      <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                         <img src=${image} />
                      </div>
                   </div>
                   <div class="font-bold">
                      <p>${(author?.name ?? "No name found").toUpperCase()}</p>
                      <p>${author.published_date ? author.published_date.slice(0, 11) : "No date found"}</p>
                   </div>
                </div>
                <div class="flex gap-4 items-center font-bold">
                   <div class="text-2xl">
                      <i class="fa-regular fa-eye"></i>
                   </div>
                   <div><p>${total_view ?? "No data found"}</p></div>
                </div>
               
                <div>
                   <label for="my-modal-6" class="btn modal-button btn-active btn-ghost hover:bg-indigo-400 font-bold" onclick="cardDetails('${id}')">Know More</label>
                </div>
             </div>
          </div>
       `;
        categoryCard.appendChild(div);
    });
    isLoading(false);
};
categoryCards("8");