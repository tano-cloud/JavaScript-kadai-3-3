'use strict'
{

    //タスクを保存する箱
    let toDoArr = [];

    //tableBodyのIDを選択
    let tBody = document.getElementById('tableBody');

    //「作業中」ボタンと「削除」ボタン(クラス：delete)を追加する関数
    function addButtons(tr) {
        let btnWork = document.createElement('button');
        btnWork.textContent = '作業中';
        tr.appendChild(btnWork);

        let delBtn = document.createElement('button');
        delBtn.classList.add('delete');
        delBtn.textContent = '削除';

        //課題２．削除ボタンをクリックするとtoDoリストの削除とIDの振りなおし
        delBtn.addEventListener('click', e => {

            //テキストボックスに入力した内容をtoDoObjオブジェクトに保存する
            //toDoArr配列のindex番号をID番号とする
            let elements = document.getElementsByTagName('tr');

            //elementsのような配列風？オブジェクト（配列っぽいもの）を本当の配列にする（HTMLCollectionとは異なり静的なもの）
            elements = [].slice.call(elements);

            //id='a'をtdの親ノードのtrに追加
            e.target.parentNode.setAttribute("id", 'a')

            //Id='a'の要素
            let element = document.getElementById('a');

            //４．Id='a'の入った要素が配列の何番目かを取得
            let index = elements.indexOf(element) - 1;

            //// toDoArr からタスクを削除する
            //５．toDoArr配列からId='a'の情報を削除
            toDoArr.splice(index, 1);

            //６．対象のtoDo削除
            tBody.removeChild(element);

            ///////////////

            ////toDoArr の内容を HTML(tbody) に変換して表示する
            //７．toDoArr配列に格納したオブジェクトにIDを新たに振りなおして
            //ループでtoDoリストのidのみを新しく振りなおす（toDoリストは削除しない）
            for (let i = 0; i < toDoArr.length; i++) {

                let obj = toDoArr[i];
                obj.id = i;

                tBody.children[i].firstElementChild.textContent = obj.id;
            }
        });
        tr.appendChild(delBtn);
    }

    //課題１．toDoリストの追加
    function addToDo() {
        document.getElementById('addBtn').addEventListener('click', () => {

            //テキストボックスに入力した内容をtoDoObjオブジェクトに保存する
            //toDoArr配列のindex番号をID番号とする
            let toDoObj = {
                id: toDoArr.length,
                comment: document.getElementById('addText').value,
            };

            //toDoObjオブジェクトの内容をtoDoArr配列の最後尾に格納する
            toDoArr.push(toDoObj);

            //trノードを生成
            let tr = document.createElement('tr');
            //trノードをhtmlへ加える
            tBody.appendChild(tr);

            //toDoArrLastが無くなるまで出力する
            for (let obj in toDoObj) {
                let td = document.createElement('td');
                td.textContent = toDoObj[obj];
                tr.appendChild(td);
            }

            //作業中と削除ボタンの追加
            addButtons(tr);

            //テキストボックスに何も入っていない状態にする
            document.getElementById('addText').value = '';
        });
    }

    //課題1.toDoリストに加える機能
    //課題２.toDoリストを削除するボタンも付与
    addToDo();
} 