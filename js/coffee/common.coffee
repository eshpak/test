$ ->
	incomeJSON = "js/data/income.json"


	$(".submit").click ->
		console.log("submitted!")
		false

	mailList = (selector, data) ->

		$(selector)
			.on("click", ".js-mail-line", () ->
				alert('click')
				t=0
				false
			)

		onLoaded = (data) ->
			i=0
			#brick=0

			refreshList = () ->

				documentFragment = $(document.createDocumentFragment())

				for mail, index in data
					$(selector)
						.find("tbody")

					tr = $("<tr data-id=\"" + index + "\" class=\"js-mail-line\"><td>" + mail.senderMail + "</td><td>" + mail.theme + "</td><td>" + mail.text + "</td></tr>");

					documentFragment.append(tr);
					t=index

				#console.info(documentFragment);
				$(selector)
					.find("tbody")
					.empty()
					.append(documentFragment);
				false

			#mails = () ->
				#data[key] for key of data

			#JSON.stringify(data[key])

			false

		onSuccess = (data) ->
			if not data.errcode
				onLoaded(data.data)
				#showLoading(false)
				false
			else
				#showLoading(false)
				#onLoadError(data.data)
				false

		$.ajax
			url: incomeJSON
			dataType: "json"
			error: (jqXHR, textStatus, errorThrown) ->
				$("body").append "AJAX Error: #{textStatus}"
				false
			success: onSuccess

		false
	#false

	income = mailList(".js-income", incomeJSON)
	#outcome = mailList(".js-income", outcomeJSON)
	#trash = mailList(".js-income", trashJSON)

	false
