<%@page import="java.io.*"%>
<%
	request.setCharacterEncoding("UTF-8");
	String modify_index = request.getParameter("modify_index");
	String modify_ToDo_day = request.getParameter("modify_ToDo_day");
	String modify_ToDo_title = request.getParameter("modify_ToDo_title");
	String modify_ToDo_content = request.getParameter("modify_ToDo_content");

	if (!modify_ToDo_title.equals("") && !modify_ToDo_content.equals("")) {

		String fileName = modify_ToDo_day + ".txt";
		String filePath = application.getRealPath("/") + "data_dir/";

		filePath += fileName;

		int modify_index_int = Integer.parseInt(modify_index);
		String file_string = "";
		String temp_string = null;
		int linecount = 0;
		try {

			File f = new File(filePath); // 파일객체생성
			f.createNewFile(); //파일생성
			// 파일쓰기;
			BufferedReader tempbr = new BufferedReader(new FileReader(filePath));
			//BufferedReader br = new BufferedReader(new FileReader(filePath));
			int i = 0;
			while ((temp_string = tempbr.readLine()) != null) {
				if (i == modify_index_int * 2) {
					file_string += modify_ToDo_title + "\r\n";
				} else if (i == modify_index_int * 2 + 1) {
					file_string += modify_ToDo_content + "\r\n";
				} else {
					file_string += temp_string + "\r\n";
				}
				i++;
			}

			tempbr.close();

			FileWriter fw = new FileWriter(filePath);
			fw.write(file_string);

			fw.close(); //파일핸들 닫기
			out.println(fileName + " saved.");
		} catch (IOException e) {
			System.out.print(e.toString());
		}
	}
%>