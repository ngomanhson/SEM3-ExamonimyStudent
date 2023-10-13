const url = {
    BASE_URL: "https://localhost:7218/api/",

    CLASS: {
        LIST: "/classes",
    },

    COURSE: {
        LIST: "/course",
    },

    STAFF: {
        LIST: "/STAFF",
    },

    STUDENT: {
        LIST: "/student",
    },

    TEST: {
        SLUG: "/test/get-by-slug",
    },

    EXAM: {
        SLUG: "/exam/get-by-slug",
    },

    QUESTION: {
        TEST_ID: "question/get-by-testId",
    },

    ANSWER: {
        LIST: "/answer",
        QUESTION_ID: "/answer/get-by-questionId",
    },
};

export default url;
