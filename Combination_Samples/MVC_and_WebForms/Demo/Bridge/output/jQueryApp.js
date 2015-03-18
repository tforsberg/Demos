﻿Bridge.Class.define('Demo.jQueryApp', {
    statics: {
        config:  {
            init: function () {
                $(this.main);
            }
        },
        main: function () {
            document.body.style.padding = "20px";
            $("<form>").addClass("col-md-6").append(Demo.jQueryApp.createPanel()).appendTo(document.body);
            Demo.jQueryApp.updateButton_Click(null);
        },
        createPanel: function () {
            return $("<div>").addClass("panel panel-default").append(Demo.jQueryApp.createPanelHeader()).append(Demo.jQueryApp.createPanelBody()).append(Demo.jQueryApp.createPanelFooter());
        },
        createPanelHeader: function () {
            return $("<div>").addClass("panel-heading logo").append($("<h1>").html("Bridge.NET jQuery Demo"));
        },
        createPanelBody: function () {
            return $("<div>").addClass("panel-body").append(Demo.jQueryApp.createFormField("Name", "user")).append(Demo.jQueryApp.createFormField("Email", "globe")).append(Demo.jQueryApp.createFormField("Message", "pencil")).append(Demo.jQueryApp.createDateTimeField());
        },
        createPanelFooter: function () {
            return $("<div>").addClass("panel-footer text-right").append(Bridge.merge(document.createElement('input'), {
                type: "submit", 
                value: "Submit", 
                className: "btn btn-success", 
                formAction: Demo.Config.SUBMIT_URL, 
                formMethod: "POST"
            } ));
        },
        createFormField: function (name, glyph) {
            var input;
            var placeholder = name + "...";
            if (name === "Message") {
                input = Bridge.merge(document.createElement('textarea'), {
                    name: name.toLowerCase(), 
                    placeholder: placeholder, 
                    required: true, 
                    className: "form-control"
                } );
            }
            else  {
                input = Bridge.merge(document.createElement('input'), {
                    type: "text", 
                    name: name.toLowerCase(), 
                    placeholder: placeholder, 
                    required: true, 
                    className: "form-control"
                } );
            }
            return $("<div>").addClass("input-group").css("margin-bottom", "10px").append(Bridge.merge(document.createElement('span'), {
                className: "glyphicon glyphicon-" + glyph + " input-group-addon"
            } )).append(input);
        },
        createDateTimeField: function () {
            return [Bridge.merge(document.createElement('label'), {
                htmlFor: "dateTimeInput", 
                innerHTML: "Server Date and Time:"
            } ), $(Bridge.merge(document.createElement('div'), {
                className: "input-group"
            } )).append(Bridge.merge(document.createElement('span'), {
                className: "input-group-addon glyphicon glyphicon-time"
            } )).append(Bridge.merge(document.createElement('input'), {
                id: "dateTimeInput", 
                type: "text", 
                className: "form-control", 
                readOnly: true, 
                name: "datetime"
            } )).append($(Bridge.merge(document.createElement('span'), {
                className: "input-group-btn"
            } )).append(Bridge.merge(document.createElement('button'), {
                type: "button", 
                className: "btn btn-primary", 
                innerHTML: "<span class=\"glyphicon glyphicon-refresh\"></span>", 
                onclick: Demo.jQueryApp.updateButton_Click
            } )))];
        },
        updateButton_Click: function (e) {
            $.ajax({ url: Demo.Config.GET_SERVER_TIME_URL, cache: false, success: function (obj, str, jqXHR) {
                var val = JSON.parse(Bridge.cast(obj, String));
                var dateTime = Bridge.Date.parse(val);
                $("#dateTimeInput").val(Bridge.Date.format(dateTime, "yyyy-MM-dd hh:mm:ss"));
            } });
        }
    }
});