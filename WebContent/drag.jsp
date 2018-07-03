<%@page import="java.util.ArrayList"%>
<%@page import="java.io.*"%>
<%@page language="java" contentType="text; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	String from_list = request.getParameter("from_list");
	String to_list = request.getParameter("to_list");
	String drag_from = request.getParameter("drag_from");
	String drop_to = request.getParameter("drop_to");
	String del_title;
	String del_content;

	String day_lists[] = { "monday_list", "tuesday_list", "wednesday_list", "thursday_list", "friday_list" };
	String file_names[] = { "Monday.txt", "Tuesday.txt", "Wednesday.txt", "Thursday.txt", "Friday.txt" };

	for (int i = 0; i < 5; i++) {
		file_names[i] = application.getRealPath("/") + "data_dir/" + file_names[i];
	}

	int from_list_index = 0;
	int to_list_index = 0;

	for (int i = 0; i < 5; i++) {
		if (from_list.equals(day_lists[i])) {
			from_list_index = i;
		}
	}

	for (int i = 0; i < 5; i++) {
		if (to_list.equals(day_lists[i])) {
			to_list_index = i;
		}
	}

	{ //from에서 삭제
		String temp_string = null;
		String str_final = "";
		File f = new File(file_names[from_list_index]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[from_list_index]));
		int qwe = 0;
		ArrayList<String> temp_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			temp_str_arr.add(temp_string);
		}
		del_content = temp_str_arr.get((Integer.parseInt(drag_from)) * 2 + 1);
		del_title = temp_str_arr.get((Integer.parseInt(drag_from)) * 2);

		temp_str_arr.remove((Integer.parseInt(drag_from)) * 2 + 1);
		temp_str_arr.remove((Integer.parseInt(drag_from)) * 2);

		for (int k = 0; k < temp_str_arr.size(); k++) {
			str_final = str_final + temp_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[from_list_index]);
		fw.write(str_final);

		fw.close();

	}

	//추가
	{
		String temp_string = null;
		String str_final = "";
		File f = new File(file_names[to_list_index]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[to_list_index]));
		int qwe = 0;
		ArrayList<String> temp_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			temp_str_arr.add(temp_string);
		}

		temp_str_arr.add(((Integer.parseInt(drop_to)) * 2), del_content);
		temp_str_arr.add(((Integer.parseInt(drop_to)) * 2), del_title);

		for (int k = 0; k < temp_str_arr.size(); k++) {
			str_final = str_final + temp_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[to_list_index]);
		fw.write(str_final);

		fw.close();

	}
%>