const formData = new FormData();

$(document).ready(function() {
  //$('#loader').hide();
  //var agreeTime = '';
  console.log("is ready called");

  if ($("#profilePict").length) {
    // patientId = $("#patientId").val();
    $("#profilePict input").on("change", function(e) {
      const file = e.target.files[0];
      console.log("attaching file");
      console.log(file);
      //const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      //$("#form-submit").prop("disabled", true);
      //$("#profilePict").addClass("uploading");
      /*
        $.ajax({
            method: "post",
            url: `/bubble/patient/${docId}/${patientId}/profile-pict`,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            headers: {
            Authorization: "Bearer " + $("#token").val()
            },
            success: function(data) {
            console.log(data);
            $("#form-submit").prop("disabled", false);
            $("#profilePict")
                .removeClass("uploading")
                .attr("style", `background-image:url(${data.url})`);
            },
            error: function(e) {
            console.error(e);
            $("#form-submit").prop("disabled", false);
            $("#profilePict").removeClass("uploading");
            }
        });
        */
    });
  }

  $("#fileUploadForm #form-submit").click(function(event) {
    //stop submit the form, we will post it manually.
    event.preventDefault();

    console.log("form submit now...");

    const empty = [];
    $("#fileUploadForm input[required]").each(function() {
      if (!$(this).val()) empty.push(`- ${$(this).attr("data-label")}`);
    });

    if (empty.length) {
      alert(`These fields should not be empty:\n${empty.join("\n")}`);
      return;
    }

    //console.log(empty);

    //Show loader
    //$("#loader").show();

    // Disable empty file fields before submitting.
    if (
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1
    ) {
      var $inputs = $('input[type="file"]:not([disabled])', "#fileUploadForm");
      $inputs.each(function(_, input) {
        if (input.files.length > 0) return;
        $(input).prop("disabled", true);
      });
    }

    // construct the FormData object that contains the data from an existing <form>
    // create data
    const data = {};
    $(
      "#fileUploadForm input[name],#fileUploadForm select[name],#fileUploadForm textarea[name]"
    ).each(function() {
      data[$(this).attr("name")] = $(this).val();
    });

    //data.privacyAcceptedAt = agreeTime;
    //data.filePaths = JSON.parse(data.filePaths);

    console.log("constructing form data now");
    console.log(data);

    // Re-enable empty file fields after creating FormData.
    if (
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1
    ) {
      $inputs.prop("disabled", false);
    }

    // disabled the submit button
    $("#form-submit").prop("disabled", true);

    console.time("test-upload");
    /*
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json",
      url: bubbleJobId + "/update",
      headers: {
        Authorization: "Bearer " + token
      },
      cache: false,
      success: function(msg) {
        // delete verification artifact
        localStorage.removeItem(VERIFYREDIRECT);
        localStorage.removeItem(VERIFYMARK);

        // console.log('saving bubble data using ajax...');
        $("#loader").hide();
        if (msg.status) {
          const getUrl = window.location;
          const baseUrl =
            getUrl.protocol +
            "//" +
            getUrl.host +
            "/" +
            getUrl.pathname.split("/")[1];
          $(location).attr("href", baseUrl + "/" + bubbleJobId + "/update");
        } else {
          alert("Issue with saving bubble data using Ajax. Please try again.");
          $("#form-submit").prop("disabled", false);
        }
        // $("#form-submit").prop("disabled", false);
        // console.timeEnd('test-upload');
      },
      error: function(e) {
        console.log("failure sending data via bubble");
        $("#loader").hide();
        $("#form-submit").prop("disabled", false);
        alert("script.js AJAX request to send bubble error. Please try again.");
        console.timeEnd("test-upload");
      }
    });
    */

    return false;
  });
});
