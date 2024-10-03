function getData(url){ //запрос данных асинхронный
    UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
    return $.ajax({
        type: 'GET',
        headers: {
            accept: "application/json;odata=verbose"
        },
        url: url
    });
}
function deleteData(url){ //функция удаления данных
    UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
    return $.ajax({
        type: 'POST',
        headers:  {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "DELETE",
            "If-Match": "*"
        },
        url: url
    });
}
function setData(item, url){ //запись данных
    UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
    return $.ajax({
      type: "POST",
      contentType: "application/json;odata=verbose",
      data: JSON.stringify(item),
      headers: {
        Accept: "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val()
      },
      url: url
    });
  }
function UpdateData(url, data) { //обновление данных
    UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
    return $.ajax({
      url: url,
      type: "POST",
      headers: {
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
          "content-Type": "application/json;odata=verbose",
          "X-Http-Method": "MERGE",
          "If-Match": "*"
      },
      data: JSON.stringify(data)
    });
  }
function UploadFiles(url, data){
  UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
  return $.ajax({
    url: url,
    type: "POST",
    processData: false,
    contentType: "application/json;odata=verbose",
    data: data,
    headers: {
        "accept": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        "content-length": data.byteLength
    }
  });
}