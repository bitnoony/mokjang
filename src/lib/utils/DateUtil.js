function formatDate(inputDate) {
	const date = new Date(inputDate);

	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
	return formattedDate.replace(
		/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/,
		"$1년 $2월 $3일 $4시 $5분",
	);
}

export default { formatDate };
