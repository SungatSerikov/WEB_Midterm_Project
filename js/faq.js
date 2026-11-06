$(".faq-question").on("click", function () {
    $(this).closest(".faq-item").find(".faq-answer").slideToggle(400);
});