const textLanguage = {
    VI: {
        title_login: "Đăng nhập",
        title_signup: "Đăng kí",
        label_account: "Tài khoản",
        textarea_account: "Tên tài khoản",
        label_password: "Mật khẩu",
        btn_login: "Đăng nhập",
        btn_signup: "Đăng ký",
        forgot_password: "Quên mật khẩu ?",

        holder_email: "Email đăng ký",
        holder_username: "Tên tài khoản",
        holder_password: "Mật khẩu",
        holder_confirm_pw: "Nhập lại mật khẩu",

        require_email: "Vui lòng nhập email !",
        require_username: "Vui lòng nhập tên tài khoản !",
        require_password: "Vui lòng nhập mật khẩu !",
        require_confirm_pw: "Vui lòng nhập mật khẩu xác thực !",

        invalid_email: "Email không hợp lệ !",
        invalid_username: "Tên tài khoản phải hơn 6 kí tự, không chứa khoảng trắng !",
        invalid_password: "Mật khẩu phải gồm kí tự: Hoa, thường và số !",
        invalid_confirm_pw: "Mật khẩu xác thực không hợp lệ !",

        //Service 24h
        title_service_24h: "Dịch Vụ Hỗ Trợ 24h",
        content_24h1: `Dịch vụ hỗ trợ 24h giúp bạn an tâm lái xe mà không lo lắng về những bất trắc trên đường.
        Bất cứ khi nào bạn và xe gặp tình huống hy hữu không mong đợi, hãy gọi ngay cho E-Car để được.`,
        content_24h2: `Hỗ trợ kỹ thuật ngay tại nơi xảy ra sự cố`,
        content_24h3: `Miễn phí kéo xe về xưởng dịch vụ chính hãng hoặc địa điểm sửa chữa trong bán kính 15km`,
        content_24h4: `Sắp xếp phương tiện thay thế cho khách hàng di chuyển`,
        content_24h5: `Hỗ trợ 10l nhiên liệu (2 lần/năm)`,
        content_24h6: `Hỗ trợ giao chìa khóa dự phòng trong bán kính 15km`,
        content_24h7: `Tất cả khách hàng sở hữu xe E-Car từ 2/7/2023 được tận hưởng những tiện ích này trong vòng 3 năm
        (tính từ ngày xuất hóa đơn) không giới hạn số lần yêu cầu dịch vụ.`,

        //Purchase
        stt_items: "Đơn hàng",
        name_items: "Tên sản phẩm",
        price_items: "Giá",
        total_price: "Tổng giá trị đơn hàng",
        payment_status: "Trạng thái thanh toán",
        order_status: "Trạng thái đơn hàng",
        actions: "Hành động",

        discount_code: "Mã giảm",
        total: "Tổng",
        canceled: "Đã được hủy",
        cancel_item: "Hủy đơn hàng",
        see_review: "Xem đánh giá",
        review: "Đánh giá",
        reorder: "Đặt lại",
        dont_have_items: "Bạn chưa có đơn hàng nào !",

        cancel_question: "Bạn có chắc chắn muốn hủy không ?",
        cancel_form: "Không",
        confirm_form: "Xác nhận",

        //Error
        error_message: "Có lỗi xảy ra! Bạn vui lòng thử lại sau",
        require_feedback: "Vui lòng cho đánh giá !"

    },
    EN: {
        title_login: "Sign in to",
        title_signup: "Sign up to",
        label_account: "Username",
        textarea_account: "Username",
        label_password: "Password",
        btn_login: "Login",
        btn_signup: "Sign up",
        forgot_password: "Forgot your password ?",

        holder_email: "Email",
        holder_username: "Username",
        holder_password: "Password",
        holder_confirm_pw: "Confirm password",

        require_email: "Please enter email !",
        require_username: "Please enter your username !",
        require_password: "Please enter your password !",
        require_confirm_pw: "Please enter confirm password !",

        invalid_email: "Invalid email !",
        invalid_username: "Username must be more than 6 characters, contain no spaces !",
        invalid_password: "Password must contain characters: Uppercase, lowercase and numbers !",
        invalid_confirm_pw: "Invalid confirm password !",

        //Service 24h
        title_service_24h: "24h Support Service",
        content_24h1: `24-hour support service helps you drive with peace of mind without worrying about problems on the road.
        Whenever you and your car encounter a rare and unexpected situation, call E-Car immediately to get help.`,
        content_24h2: `Technical support right at the scene of the problem`,
        content_24h3: `Free towing of the vehicle to the genuine service workshop or repair location within a radius of 15km`,
        content_24h4: `Arrange alternative transportation for customers`,
        content_24h5: `Support 10 liters of fuel (2 times/year)`,
        content_24h6: `Support delivery of spare keys within a radius of 15km`,
        content_24h7: `All customers who own an E-Car from July 2, 2023 can enjoy these benefits for 3 years
        (calculated from the invoice date) unlimited number of service requests.`,

        //Purchase
        stt_items: "Items",
        name_items: "Items name",
        price_items: "Price",
        total_price: "Total price",
        payment_status: "Payment status",
        order_status: "Order status",
        actions: "Action",

        discount_code: "Discount code",
        total: "Total",
        canceled: "Canceled",
        cancel_item: "Cancel",
        see_review: "See review",
        review: "Review",
        reorder: "Reorder",
        dont_have_items: `You don't have any orders yet!`,

        cancel_question: "Are you sure you want to cancel ?",
        cancel_form: "No",
        confirm_form: "Yes",

        //Error
        error_message: "Something wrong ! Let's try again.",
        require_feedback: "Please rate !"
    }
}

const paymentStatus = {
    PAID: {
        mess_vi: "Đã thanh toán",
        mess_en: "Paid",
    },
    UNPAID: {
        mess_vi: "Chưa thanh toán",
        mess_en: "Unpaid",
    }
}

const paymentType = {
    CASH: {
        mess_vi: "Tiền mặt",
        mess_en: "Cash",
    },
    TRANSFER: {
        mess_vi: "Chuyển khoản",
        mess_en: "Transfer",
    }
}

const deliveryStatus = {
    UNDELIVERY: {
        mess_vi: "Đang xử lý",
        mess_en: "Application received",
    },
    PREPARING: {
        mess_vi: "Đang chuẩn bị đơn hàng",
        mess_en: "Preparing orders",
    },
    DELIVERING: {
        mess_vi: "Đang vận chuyển",
        mess_en: "Being transported",
    },
    DELIVERED: {
        mess_vi: "Đã nhận hàng",
        mess_en: "Goods received",
    }
}

module.exports = {
    textLanguage,
    paymentStatus,
    paymentType,
    deliveryStatus
}