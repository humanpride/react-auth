import $ from 'jquery';

function getProfileData()
{
    let result = null;
    $.ajax({
        // получение данных
        type: "POST",
        url: "/back-end/controllers/UserProfile.php",
        data: "accessToken="+localStorage.getItem('accessToken'),
        async: false,
        success: function (response) {
            let tokenUpdated = 0;
            if (response === 'guest') {
                return;
            } else if (response === 'token expired') {
                $.ajax({
                    // обновление токенов
                    type: "POST",
                    url: "/back-end/controllers/UserProfile.php",
                    data: "refreshToken="+localStorage.getItem('refreshToken'),
                    async: false,
                    success: function(response) {
                        if (response !== 'guest') {
                            const tokenArr = response.split(" && ");
                            localStorage.setItem('accessToken', tokenArr[0]);
                            localStorage.setItem('refreshToken', tokenArr[1]);
                            tokenUpdated = 1;
                        } else {
                            tokenUpdated = -1;
                        }
                    }
                });
            } else {
                const parser = new DOMParser();
                const xml = parser.parseFromString(response, "text/xml");
                const xmlCollection = xml.childNodes[0].childNodes; // контейнер, содержит в себе все нужные теги
                const arrayFromXML = {};
                for (let i = 0; i < xmlCollection.length; i++) {
                    arrayFromXML[xmlCollection[i].tagName] = xmlCollection[i].innerHTML;
                }
                arrayFromXML.length = xmlCollection.length; // у сформированного массива arrayFromXML length == 0, поэтому присваивается length от xmlCollection
                result = arrayFromXML;
            }

            if (tokenUpdated === 1) {
                result = getProfileData();
            } else if (tokenUpdated === -1) {
                return;
            }
        }
    });

    return result;
}

export { getProfileData };
