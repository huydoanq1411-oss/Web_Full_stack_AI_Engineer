/* ============================================================
   quiz-tracker.js
   Theo dõi tiến độ làm quiz xuyên suốt 12 phần của khóa học
   Thuật toán & Cấu trúc dữ liệu. Lưu vào localStorage của
   trình duyệt (chỉ hoạt động khi mở file trực tiếp/qua server,
   không áp dụng khi nhúng trong khung xem trước có giới hạn).
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "algo-mastery-quiz-progress";

  function safeGetStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function safeSetStore(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* localStorage không khả dụng (chế độ riêng tư, v.v.) - bỏ qua an toàn */
    }
  }

  /**
   * Ghi nhận một câu trả lời quiz.
   * @param {number} partNumber - số thứ tự phần (1-12)
   * @param {boolean} isCorrect - true nếu trả lời đúng
   */
  window.recordQuizAnswer = function (partNumber, isCorrect) {
    try {
      var store = safeGetStore();
      var key = "part" + partNumber;
      if (!store[key]) {
        store[key] = { correct: 0, total: 0 };
      }
      store[key].total += 1;
      if (isCorrect) {
        store[key].correct += 1;
      }
      safeSetStore(store);
    } catch (e) {
      /* không bao giờ để lỗi ở đây làm hỏng giao diện quiz */
    }
  };

  /**
   * Lấy tổng quan tiến độ toàn khóa học (dùng cho trang tổng kết nếu cần).
   * @returns {{correct:number, total:number, parts:number}}
   */
  window.getQuizProgressSummary = function () {
    var store = safeGetStore();
    var correct = 0, total = 0, parts = 0;
    Object.keys(store).forEach(function (k) {
      correct += store[k].correct || 0;
      total += store[k].total || 0;
      parts += 1;
    });
    return { correct: correct, total: total, parts: parts };
  };
})();
