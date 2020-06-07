window.onload = () => {
    chapterInput = document.querySelector("#chapter-input");
    pageInput = document.querySelector("#page-input");

    urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('chapter-num')) {
        clearReaderContent();
        chapterInput.value = urlParams.get('chapter-num');
        fetch(new Number(chapterInput.value));
    } else {
        chapterInput.value = 1
        fetch(1);
    }

    chapterInput.addEventListener('keypress', (e) => {
        if (e.keyCode == '13') {
            clearReaderContent();
            fetch(chapterInput.value);
        }
    });

    document.querySelector("#chapter-next").addEventListener('click', () => {
        nextChapter(chapterInput.value);
    });

    document.querySelector("#chapter-prev").addEventListener('click', () => {
        prevChapter(chapterInput.value)
    });

    document.querySelector("#page-next").addEventListener('click', () => {
        nextPage()
    });

    document.querySelector("#page-prev").addEventListener('click', () => {
        prevPage()
    });
};

function clearReaderContent() {
    content = document.querySelector(".reader__content");
    for (let child = 0; child < content.children.length; child++) {
        content.children.item(child).remove();
    }
}

function fetch(chapter) {
    page = 1;

    loading = setInterval(() => {

        if (page <= 50) {
            loadPages(["https://read.mangadad.com/Mangadad/slam-dunk", getChapter(chapter), getPage(page, "jpg")].join("/"))
            page++
        } else {
            clearInterval(loading);
        }
    }, 100);

}

function loadPages(url) {
    image = new Image();

    image.addEventListener("load", (e) => {
        e.target.classList.add("reader__page");
        document.querySelector(".reader__content").appendChild(e.target);
    });

    image.src = url;
}

function getChapter(chapterNum, prefix = "chapter", ) {
    return [prefix, chapterNum].join("-");
}

function getPage(pageNum, format) {
    return [pageNum, format].join(".");
}