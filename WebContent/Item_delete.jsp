<%@page import="java.util.ArrayList"%>
<%@page import="java.io.*"%>
<%@page language="java" contentType="text; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	request.setCharacterEncoding("UTF-8");
	String[] mon_index = request.getParameterValues("mon_del");
	String[] tue_index = request.getParameterValues("tue_del");
	String[] wed_index = request.getParameterValues("wed_del");
	String[] thur_index = request.getParameterValues("thur_del");
	String[] fri_index = request.getParameterValues("fri_del");

	System.out.println(mon_index.length + "    " + tue_index.length + "    " + wed_index.length + "    "
			+ thur_index.length + "    " + fri_index.length + "    ");

	String file_names[] = { "Monday.txt", "Tuesday.txt", "Wednesday.txt", "Thursday.txt", "Friday.txt" };
	for (int i = 0; i < 5; i++) {
		file_names[i] = application.getRealPath("/") + "data_dir/" + file_names[i];
	}

	{
		String temp_string = null;
		String mon_final = "";
		File f = new File(file_names[0]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[0]));
		int qwe = 0;
		ArrayList<String> mon_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			mon_str_arr.add(temp_string);
		}

		for (int a = 1; a < mon_index.length; a++) {
			mon_str_arr.remove((Integer.parseInt(mon_index[a])) * 2 + 1);
			mon_str_arr.remove((Integer.parseInt(mon_index[a])) * 2);
		}

		for (int k = 0; k < mon_str_arr.size(); k++) {
			mon_final = mon_final + mon_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[0]);
		fw.write(mon_final);

		fw.close();

	}

	{
		String temp_string2 = null;
		String tue_final = "";
		File f = new File(file_names[1]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[1]));
		int qwe = 0;
		ArrayList<String> tue_str_arr = new ArrayList<String>();
		while ((temp_string2 = tempbr.readLine()) != null) {
			tue_str_arr.add(temp_string2);
		}

		for (int a = 1; a < tue_index.length; a++) {
			tue_str_arr.remove((Integer.parseInt(tue_index[a])) * 2 + 1);
			tue_str_arr.remove((Integer.parseInt(tue_index[a])) * 2);
		}

		for (int k = 0; k < tue_str_arr.size(); k++) {
			tue_final = tue_final + tue_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[1]);
		fw.write(tue_final);

		fw.close();

	}

	{
		String temp_string = null;
		String wed_final = "";
		File f = new File(file_names[2]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[2]));
		int qwe = 0;
		ArrayList<String> wed_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			wed_str_arr.add(temp_string);
		}

		for (int a = 1; a < wed_index.length; a++) {
			wed_str_arr.remove((Integer.parseInt(wed_index[a])) * 2 + 1);
			wed_str_arr.remove((Integer.parseInt(wed_index[a])) * 2);
		}

		for (int k = 0; k < wed_str_arr.size(); k++) {
			wed_final = wed_final + wed_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[2]);
		fw.write(wed_final);

		fw.close();

	}

	{
		String temp_string = null;
		String thur_final = "";
		File f = new File(file_names[3]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[3]));
		int qwe = 0;
		ArrayList<String> thur_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			thur_str_arr.add(temp_string);
		}

		for (int a = 1; a < thur_index.length; a++) {
			thur_str_arr.remove((Integer.parseInt(thur_index[a])) * 2 + 1);
			thur_str_arr.remove((Integer.parseInt(thur_index[a])) * 2);
		}

		for (int k = 0; k < thur_str_arr.size(); k++) {
			thur_final = thur_final + thur_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[3]);
		fw.write(thur_final);

		fw.close();
	}

	{
		String temp_string = null;
		String fri_final = "";
		File f = new File(file_names[4]);
		f.createNewFile();
		BufferedReader tempbr = new BufferedReader(new FileReader(file_names[4]));
		int qwe = 0;
		ArrayList<String> fri_str_arr = new ArrayList<String>();
		while ((temp_string = tempbr.readLine()) != null) {
			fri_str_arr.add(temp_string);
		}

		for (int a = 1; a < fri_index.length; a++) {
			fri_str_arr.remove((Integer.parseInt(fri_index[a])) * 2 + 1);
			fri_str_arr.remove((Integer.parseInt(fri_index[a])) * 2);
		}

		for (int k = 0; k < fri_str_arr.size(); k++) {
			fri_final = fri_final + fri_str_arr.get(k) + "\r\n";
		}
		tempbr.close();

		FileWriter fw = new FileWriter(file_names[4]);
		fw.write(fri_final);

		fw.close();
	}
%>