function random (dice_elem) {
	var dice = document.getElementById(dice_elem);
	var ran = Math.round(Math.random() * (6 - 1) + 1);
	
	for (var i = 0; i < dice.children.length; i++) {
		dice.children[i].style.display = 'none';
	}
	
	switch (ran) {
		case 1:
		// show 4 (index: 3)
			dice.children[3].style.display = 'block';
			break;
		case 2:
		// show 1 7
			dice.children[0].style.display = 'block';
			dice.children[6].style.display = 'block';
			break;
		case 3:
		// show 1 4 7 (index: 0,3,6)
			dice.children[0].style.display = 'block';
			dice.children[3].style.display = 'block';
			dice.children[6].style.display = 'block';
			break;
		case 4:
		// show 1 2 6 7
			dice.children[0].style.display = 'block';
			dice.children[1].style.display = 'block';
			dice.children[5].style.display = 'block';
			dice.children[6].style.display = 'block';
			break;
		case 5:
		// show 1 2 4 6 7
			dice.children[0].style.display = 'block';
			dice.children[1].style.display = 'block';
			dice.children[3].style.display = 'block';
			dice.children[5].style.display = 'block';
			dice.children[6].style.display = 'block';
			break;
		case 6:
		// show 1 2 3 5 6 7
			dice.children[0].style.display = 'block';
			dice.children[1].style.display = 'block';
			dice.children[2].style.display = 'block';
			dice.children[4].style.display = 'block';
			dice.children[5].style.display = 'block';
			dice.children[6].style.display = 'block';
			break;
	}

	return ran;
}

function dices () {
	var total = document.getElementsByClassName('total');
	var block_dices = document.getElementsByClassName('block_dices');
	var slider_ring = document.getElementsByClassName('slider_ring')[0];
	var history_list = document.getElementsByClassName('history_list')[0];
	var score = 0;
	var cout = 5;

	block_dices[0].classList.add('animation_block_dices');
	total[0].classList.remove('animation_total');

	var timerId = setInterval(function() {
		var d1 = random ('dice1');
		var d2 = random ('dice2'); // расчитываем 2 кубика
	cout--;
    	if(cout == 0) { 
    		let new_li = document.createElement('li');
    		new_li.classList.add('history_list_li');

    		block_dices[0].classList.remove('animation_block_dices');
    		total[0].classList.add('animation_total');

    		if(slider_ring.classList.contains('ring_right') == true) //если ползунок переключен (1 кубик)
    		{
    			total[0].innerHTML = d1;
    			new_li.innerHTML = d1;
    		}
    		else {
    			total[0].innerHTML = d1+d2;
    			new_li.innerHTML = d1+':'+d2;
    		}

    		history_list.insertBefore(new_li, history_list.firstChild);

    		//удаление не помещающихся элементов (скрол бар не должен образовываться)
    		var his_list_cont = document.getElementsByClassName('history_list_container')[0];
    		while((his_list_cont.scrollHeight - his_list_cont.clientHeight) > 0 ) //определяем выпирающую высоту
    		{
    			history_list.lastElementChild.remove(); //пока выпирает удаляем последний элемент
    		}

    		clearInterval(timerId); 
    	}
	}, 100); 
}

// обработка нажатия любой клавиши при работе со вкладкой
window.addEventListener('keypress', function() {
	dices ();
})


 document.getElementsByClassName('click_block')[0].addEventListener('click', function() { 
 	dices ();
 });

// обработка нажатия на шестерёнку
document.getElementsByClassName('icon-cog')[0].addEventListener('click', function () {
	var modal = document.getElementsByClassName('modal_win')[0];
	var icon_cog = document.getElementsByClassName('icon-cog')[0];

	if(modal.classList.contains('modal_width')) {
		modal.classList.remove('modal_width');
		icon_cog.classList.remove('icon_effect');
		console.log('1');
	}
	else {
		modal.classList.add('modal_width');
		icon_cog.classList.add('icon_effect');
		console.log('2');
	}
	
})


// обработка нажатия ползунка (1 кубик или 2)
document.getElementsByClassName('slider')[0].addEventListener('click', function () {
	var slider_ring = document.getElementsByClassName('slider_ring')[0];

	if(slider_ring.classList.contains('ring_right')) {
		slider_ring.classList.remove('ring_right');
		let dice2 = document.getElementById('dice2');
		dice2.classList.remove('dice2_shift');
		
		let dice1 = document.getElementById('dice1').classList.remove('dice1_shift');
		console.log('1');
	}
	else {
		slider_ring.classList.add('ring_right');
		let dice2 = document.getElementById('dice2');
		dice2.classList.add('dice2_shift');

		let dice1 = document.getElementById('dice1').classList.add('dice1_shift');
		console.log('2');
	}	
})

function arrow () {
	var icon_play3 = document.getElementsByClassName('icon-play3')[0];
	var block_history = document.getElementsByClassName('block_history')[0];

	if(icon_play3.classList.contains('history_icon_anime2')) {
		icon_play3.classList.remove('history_icon_anime2');
		block_history.classList.remove('block_history_left');
	} else {
		icon_play3.classList.add('history_icon_anime2');
		block_history.classList.add('block_history_left');
	}
}

// нажатие на стрелку
document.getElementsByClassName('history_toggle')[0].addEventListener('click', function () {
	arrow();
});

arrow(); // имитация клика на стрелку (просто вызов соответстующей функции - не имитация как таковая)
// сделано, что бы показать мользователю все возможности сайта