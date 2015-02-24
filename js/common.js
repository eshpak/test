// Generated by CoffeeScript 1.9.1
(function() {

      var income, mailList;


    mailList = function(type) {
      var onLoaded,
          onSuccess,
          length = 140,
          selector = ".js-"+type,
          jsonUrl = "js/data/"+ type +".json"

      onLoaded = function(data, obj) {

        var brick
        var documentFragment, index, j, len, mail, t, tr, href;

        brick = parseInt($(selector).attr('data-brick-num')) + 1;

        documentFragment = $(document.createDocumentFragment());
        for (index = j = 0, len = data.length; j < len; index = ++j) {
        mail = data[index];

          if (!mail.theme)
            mail.theme = truncate(mail.text, length);

          logo = makeLogo(mail.senderMail);

          tr = $("<tr data-id=\"" + index + "\" class=\"mail-line js-mail-line\"><td>"+ logo + mail.senderMail + "</td><td>" + mail.theme + "</td></tr>");

          if (index == 0) {
            $(tr)
              .attr('id', type+ brick)
              .attr('data-brick-num', brick);
            if($(selector).parent().hasClass('active')) {
              if (!window.location.href.split('#')[1])
              changePageUrl(type, brick);
            }
          }
          documentFragment.append(tr);
        }

        $(selector)
          .attr('data-brick-num', brick)
          .find("tbody")
          .append(documentFragment);
        return false;
      };

      onSuccess = function(data, obj) {
        if (!data.errcode) {
          $('js-empty').addClass('hide');
          $('js-loading').removeClass('hide');
          obj.data = obj.data.concat(data.data);
          onLoaded(data.data);
           return false;
         }
      };

      return {
        data: [],
        load: function(type) {
          console.log(this);
          var obj = this;
          $.ajax({
            url: "js/data/"+ type +".json",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown) {
              $("body").find('.js-error').append("AJAX Error: " + textStatus);
              return false;
            },
            success: function(data){
              onSuccess(data, obj)
            }
          });
        }
      }
    };



$(function() {

    // Income
    income = mailList('income');
    income.load('income');

    // Outcome
    outcome = mailList('outcome');
    outcome.load('outcome');

    //Trash
    trash = mailList('trash');
    trash.load('trash');

    $('.js-income').on("click", ".js-mail-line", function() {
      showModal(income.data, $(this).attr('data-id'));
    });

    $('.js-outcome').on("click", ".js-mail-line", function() {
      showModal(outcome.data, $(this).attr('data-id'));
    });

    $('.js-trash').on("click", ".js-mail-line", function() {
      showModal(trash.data, $(this).attr('data-id'));
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      changePageUrl(getCurrentType(), 0);
    })


    $(window).scroll(function(){
      documentHeight = $(document).height();
      if ($(window).scrollTop() > documentHeight - $(window).height() - documentHeight*0.2){
        var type = getCurrentType();
        selectLoadedObj(type);
      }

    });
    return false;
  });


  function showModal(data, id) {

    $('#myModal')
      .modal('show')
      .on('hide.bs.modal', function () {
        $(this).attr('data-id','')
        $(this).find('.js-theme, .js-sender, .js-text').html('');
      })
      .on('shown.bs.modal', function () {
        $(this)
          .find('.js-theme')
          .html(data[id].theme).end()
          .find('.js-sender')
          .html(data[id].senderMail).end()
          .find('.js-text')
          .html(data[id].text);
        });
  }

  function truncate (str, length) {
    var
      i = 0,
      result='';

      if (str.length <= length)return str;

      result = str.slice(0, length);

      if (str[length - 1] == ' ')return result;

      while (str[length + i] != ' ') {
        result += str[length + i]
        i++;
      }
      return result;
  }


  function makeLogo (email) {
    var yandex = 'yandex.ru';
    var google = 'google.com';
    var mail = 'mail.ru';
    var reg = /[a-zA-Z]+\.(?:[a-zA-Z]+)$/i;
    var res;
    var className;

    res = reg.exec(email);

    if (res != null) {
      switch (res[0]) {
        case yandex:
          className = "yandex";
          break
        case google:
          className = "google";
          break
        case mail:
          className = "mail";
          break
      }
      return "<span class=\"logo logo-"+ className +"\"></span>";;
    }
  }

   function changePageUrl(type, brick) {
    href = window.location.href.split('#')[0];
    window.addEventListener('popstate', function(event) {
      console.log("Page state data:", event.state);
    },  false);
    history.pushState(brick, "", href+"#"+type+brick);
   }

   function getCurrentType () {
        if ($('.js-tab-pane.active').find('.js-income').length > 0)
          return 'income';
        else if ($('.js-tab-pane.active').find('.js-outcome').length > 0)
          return 'outcome';
        else if ($('.js-tab-pane.active').find('.js-trash').length > 0)
          return 'trash';
   }

   function selectLoadedObj (type) {
        switch (type) {
          case 'income':
            income.load(type);
            break
          case 'outcome':
            outcome.load(type);
            break
          case 'trash':
            trash.load(type);
            break
        }
   }

}).call(this);
