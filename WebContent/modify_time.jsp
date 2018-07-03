<%@page import="java.io.*"%>
<%@page language="java" contentType="text; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	String month = request.getParameter("month");
	String day = request.getParameter("day");
	String year = request.getParameter("year");
	String day_index = request.getParameter("day_index");
	String hour = request.getParameter("hour");
	String min = request.getParameter("min");

	String fileName = "modi_time.txt";
	String filePath = application.getRealPath("/") + "data_dir/";

	filePath += fileName;

	try {

		File f = new File(filePath); // 파일객체생성
		if (!f.exists())
			f.createNewFile(); //파일생성
		// 파일쓰기
		BufferedWriter bw = new BufferedWriter(new FileWriter(filePath));
		PrintWriter pw = new PrintWriter(bw);
		pw.println(year + '-' + month + '-' + day+" "+day_index + " " + hour + " : "+min);
		bw.close();
		pw.close(); //파일핸들 닫기
		out.println(fileName + " saved.");
	} catch (IOException e) {
		System.out.print(e.toString());
	}
%>