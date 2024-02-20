import 'dart:convert';

import 'package:create_event2/model/vote.dart'; // 引入投票模型
import 'package:create_event2/page/vote/vote_result.dart'; // 引入投票結果頁面
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

import '../../model/event.dart';
import '../../provider/vote_provider.dart'; // 引入投票提供者
import '../../services/http.dart';
import '../login_page.dart'; // 引入HTTP服務

class SingleVote extends StatefulWidget {
  final Vote vote; // 投票對象
  final Event? event;

  const SingleVote({
    Key? key,
    required this.vote,
    this.event,
  }) : super(key: key);

  @override
  _SingleVoteState createState() => _SingleVoteState();
}

class _SingleVoteState extends State<SingleVote> {
  int selectedOptionIndex = -1; // 選中的選項索引
  late List<dynamic> _voteOptions = [];

  @override
  void initState() {
    super.initState();
    getOption(); // 抓回選項內容
    getallResult(); // 抓回投票結果
  }

  // 抓回選項內容
  getOption() async {
    print("-------------getOption-----------------");
    print(widget.vote.vID);

    final result = await APIservice.seletallVoteOptions(vID: widget.vote.vID);
    print('伺服器返回的結果: $result');

    if (result[0]) {
      setState(() {
        _voteOptions = result[1].map((map) => VoteOption.fromMap(map)).toList();
      });
      print('voteOptions-----------------');
      // print(_voteOptions);
      // List<int> optionIDs = [];
      for (int i = 0; i < _voteOptions.length; i++) {
        // optionIDs.add(_voteOptions[i].oID);
        final result2 = await APIservice.addVoteResult(content: {
          'vID': widget.vote.vID,
          'oID': _voteOptions[i].oID,
          'userMall': FirebaseEmail!,
          'status': 0,
        });
      }
      // print(optionIDs);
    } else {
      print('$result 在 server 抓取投票選項失敗');
    }
  }

  // 抓回投票結果
  getallResult() async {
    print("------------vote_single.dartgetallResult------------------");
    print(widget.vote.vID);
    // 調用 APIservice 的方法獲取投票結果
    final result = await APIservice.seletallVoteResult(
        vID: widget.vote.vID, userMall: FirebaseEmail!);
    print('伺服器返回的結果: $result');
    // 確保結果不為空且格式正確
    if (result != null && result.isNotEmpty) {
      if (result is List &&
          result.length == 2 &&
          result[1] is List &&
          result[1].isNotEmpty &&
          result[1][0] is Map) {
        int statusIsTrue_s_OID_s_Index = -1;
        // 遍歷投票結果，查找 'status' 為 1 的選項
        for (int i = 0; i < result[1].length; i++) {
          if (result[1][i]['status'] == 1) {
            statusIsTrue_s_OID_s_Index = i;
          }
        }
        print(statusIsTrue_s_OID_s_Index);
        // 獲取伺服器返回的第一個選項的 oID
        int oIDFromServer = result[1][0]['oID'];
        print(result);
        // 如果有選項 'status' 為 1，則更新 selectedOptionIndex
        if (statusIsTrue_s_OID_s_Index != -1) {
          setState(() {
            for (int i = 0; i < _voteOptions.length; i++) {
              // 查找投票選項中與伺服器返回的選項相符的索引
              if (_voteOptions[i].oID ==
                  result[1][statusIsTrue_s_OID_s_Index]['oID']) {
                selectedOptionIndex = i;
              }
            }
            print('抓投票結果成功: $selectedOptionIndex');
          });
        }
      } else {
        // 顯示未投票的提示，並將 selectedOptionIndex 設置為一個無效值
        setState(() {
          selectedOptionIndex = -1;
        });
        print('未投票');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('投票', style: TextStyle(color: Colors.black)),
        centerTitle: true,
        backgroundColor: const Color(0xFF4A7DAB),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/images/back.png',
              fit: BoxFit.cover,
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  widget.vote.voteName,
                  style: const TextStyle(
                      fontSize: 30, fontWeight: FontWeight.bold),
                ),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: _voteOptions.length,
                itemBuilder: (context, index) {
                  String optionText =
                      _voteOptions[index].votingOptionContent.join(", ");
                  bool isDateRange =
                      RegExp(r'\d{12} ~ \d{12}').hasMatch(optionText);
                  IconData iconData = isDateRange
                      ? Icons.date_range
                      : Icons.help_outline; // 根據是否是日期範圍選擇圖標

                  if (isDateRange) {
                    DateTime startDate = parseDate(optionText.split(' ~ ')[0]);
                    DateTime endDate = parseDate(optionText.split(' ~ ')[1]);

                    String formattedStartDate =
                        DateFormat('yyyy-MM-dd HH:mm').format(startDate);
                    String formattedEndDate =
                        DateFormat('yyyy-MM-dd HH:mm').format(endDate);
                    optionText = '$formattedStartDate ~ $formattedEndDate';
                  }

                  print('optionText: $optionText'); // 顯示格式化後或原始的選項文本

                  return Card(
                    child: ListTile(
                      leading: Icon(iconData, color: Colors.blue), // 使用選擇的圖標
                      title: Text(
                        optionText,
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      trailing: Radio(
                        value: index,
                        groupValue: selectedOptionIndex,
                        onChanged: (int? value) {
                          setState(() {
                            selectedOptionIndex = value!;
                          });
                        },
                      ),
                    ),
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: const Color(0xFFCFE3F4),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                  child: const Text(
                    "投票",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                      fontFamily: 'DFKai-SB',
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  onPressed: () async {
                    if (selectedOptionIndex == -1) {
                      print('請選擇一個選項');
                      return;
                    }
                    String tmpUserMail = FirebaseEmail!; //這裡要更改為使用者的userMall
                    print('seletallVoteResult');

                    final tmpResult = await APIservice.seletallVoteResult(
                        vID: widget.vote.vID, userMall: tmpUserMail);

                    print(tmpResult);
                    Map<String, dynamic> content;
                    print('voteOptions');
                    print(_voteOptions);
                    // 遍歷所有投票選項，準備更新結果
                    for (int i = 0; i < _voteOptions.length; i++) {
                      // 根據選中的選項更新投票結果內容
                      if (tmpResult[1][i]["oID"] ==
                          _voteOptions[selectedOptionIndex].oID) {
                        content = {
                          'vID': widget.vote.vID,
                          'oID': tmpResult[1][i]["oID"],
                          'userMall': tmpUserMail,
                          'status': 1, // 選中的選項設置為已投票
                        };
                      } else {
                        content = {
                          'vID': widget.vote.vID,
                          'oID': tmpResult[1][i]["oID"],
                          'userMall': tmpUserMail,
                          'status': 0, // 未選中的選項設置為未投票
                        };
                      }
                      // 更新投票結果
                      final result = await APIservice.updateResult(
                          content: content,
                          voteResultID: tmpResult[1][i]["voteResultID"]);
                      int tmpOid = tmpResult[1][i]["oID"];
                      if (result[0]) {
                        print('更改$tmpOid結果成功');
                      } else {
                        print('更改$tmpOid結果失敗');
                      }
                    }
                    // 跳轉頁面到投票結果
                    Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => VoteResultPage(
                                  voteName: widget.vote.voteName,
                                  vID: widget.vote.vID,
                                  event: widget.event,
                                )));
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  DateTime parseDate(String dateStr) {
    // 假設 dateStr 是 "202312040800~202312040900" 這樣的格式
    var StartTimeInt = int.parse(dateStr);

    return DateTime(
        StartTimeInt ~/ 100000000, // 年
        (StartTimeInt % 100000000) ~/ 1000000, // 月
        (StartTimeInt % 1000000) ~/ 10000, // 日
        (StartTimeInt % 10000) ~/ 100, // 小时
        StartTimeInt % 100 // 分钟
        );
  }
}