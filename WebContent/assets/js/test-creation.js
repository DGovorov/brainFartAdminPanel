$(document).ready(function()
{
    var EnterKey = 13,
        countT = 1,
        countQ = 0,
        countA = 0;

    // Добавление инкремента у id теста
    $('[name=testName]').on('change', function(){
        $(this).attr('id', 't'+countT+'');
    });

    // Добавление инпута ссылки, если тест приватный
    $('#testAval').on('change', '[type="radio"]', function() {
        var _id = $(this).attr('id'),
            testUrl = $('<input type="text"id="InputTestUrl" placeholder="Ссылка сгенерируется автоматически" class="form-control">');

        if(_id == 'testPrivate') {
            $('#testAval').append(testUrl);
        } else{
            $('#testAval').find('#InputTestUrl').remove();
        }
    });

    /* Добавление вопросов */
    $('#inputQ').on('keypress', function (evt)
    {
        if (evt.which === EnterKey && $(this).val() !== '')
        {
            var addQuestionItem = $('#inputQ').val();
            countQ++;
            $('#questionList').append(
                '<li class="questionItem">' + addQuestionItem + '<input name="t['+countQ+'][quest]" type="hidden"  value="' + addQuestionItem + '"><ul id="answerList'+ countQ +'"</ul>' + '</li>'
            );
            $(this).val('');
            $(this).prop('disabled', true);
            $('#inputA').prop('disabled', false);
            $('#topScore').focus();
        }

    });

    /* Добавление вариантов ответов  */
    $('#inputA').on('keypress', function (evt)
    {
        if (evt.which === EnterKey && $(this).val() !== '')
        {
            var answerItem = $('#inputA').val(),
                topScore = $('#topScore').val(),
                isChecked = $('#correctA').prop('checked'),
                addAnswerItem = $('<li class="answerItem">' + answerItem +
                                        '<span class="topScore"> — </span>'+ topScore +

                                        '<input name="t['+ countQ +'][answers]['+countA+'][name]" type="hidden"  value="' + answerItem + '">' +
                                        '<input name="t['+ countQ +'][answers]['+countA+'][score]" type="hidden"  value="' + topScore + '">' +
                                        '<input name="t['+ countQ +'][answers]['+countA+'][correct]" type="hidden"  value="' + isChecked + '">' +
                                    '</li>'),

                addAnswerItemCorrect = $('<li class="answerItem">&#9989;' + answerItem +
                                            '<span class="topScore"> — </span>'+ topScore +

                                            '<input name="t['+ countQ +'][answers]['+countA+'][name]" type="hidden"  value="' + answerItem + '">' +
                                            '<input name="t['+ countQ +'][answers]['+countA+'][score]" type="hidden"  value="' + topScore + '">' +
                                            '<input name="t['+ countQ +'][answers]['+countA+'][correct]" type="hidden"  value="' + isChecked + '">' +
                                        '</li>');


            /*  Увеличиваем счётчик вариантов ответов  */
            countA++;

            /* Проверяем, отмечен ли правильный ответ. Добавляем вариант ответа */
            if ($('#correctA').prop('checked')) {
                $('#answerList'+ countQ +'').append(addAnswerItemCorrect);
            } else {
                $('#answerList'+ countQ +'').append(addAnswerItem);
            }

            /* Очищаем форму */
            $(this).val('');

            // Снимаем выделение чекбокса
            $('#correctA').prop('checked',false);

            /* Добавляем кнопку сохранения вопроса */
            if (countA == 1 && countQ == 1 ) {
                $('#questionList').after('<button type="button" class="btn btn-success" id="saveQuestion">Сохранить вопрос</button>');
            }
            /* Сохранение вопроса */
            $('#saveQuestion').on('click', function (evt)
            {
                countA=0;
                $('#inputQ').prop('disabled', false);
                $('#inputA').prop('disabled', true);
                $('#inputQ').focus();
            });
        }
    });

});