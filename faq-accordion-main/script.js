function toggleFAQ(answerId, iconPlusId, iconMinusId) {
    var answer = document.getElementById(answerId);
    var iconPlus = document.getElementById(iconPlusId);
    var iconMinus = document.getElementById(iconMinusId);

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        iconPlus.style.display = "none";
        iconMinus.style.display = "inline-block";
    } else {
        answer.style.display = "none";
        iconPlus.style.display = "inline-block";
        iconMinus.style.display = "none";
    }
}
