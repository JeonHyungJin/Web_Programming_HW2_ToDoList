<%@page import="java.io.*"%>
<%@page language="java" contentType="text; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	String todo_day = request.getParameter("ToDo_day");
	String todo_title = request.getParameter("ToDo_title");
	String todo_content = request.getParameter("ToDo_content");

	String fileName = todo_day + ".txt";
	String filePath = application.getRealPath("/") + "data_dir/";

	File qwe = new File(filePath); // 파일객체생성

	if (!qwe.exists()) {
		qwe.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
	}
	filePath += fileName;

	try {

		File f = new File(filePath); // 파일객체생성
		if (!f.exists())
			f.createNewFile(); //파일생성
		// 파일쓰기
		BufferedWriter bw = new BufferedWriter(new FileWriter(filePath, true));
		PrintWriter pw = new PrintWriter(bw, true);
		if (!todo_title.equals("") && !todo_content.equals("")) {
			pw.println(todo_title); //파일에다 작성
			pw.println(todo_content); //파일에다 작성
		}
		bw.close();
		pw.close(); //파일핸들 닫기
		out.println(fileName + " saved.");
	} catch (IOException e) {
		System.out.print(e.toString());
	}
%>