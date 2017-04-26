function menuselect()
{
    if (document.getElementById("menu").value == "Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Create a Category")
    {
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Update a Category")
    {
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a Category")
    {
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About Me")
    {
        document.getElementById("section5").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}

function getlist()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateOutput1(output);
            }
    }
        objRequest.open("GET", url, true);
        objRequest.send();
}
 function GenerateOutput1(result)
{
    var count = 0;
    var displaytext = "";
    resulttable = "<table><tr><th><Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for(count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += result.GetAllCategoriesResult[count].CID + ", " + result.GetAllCategoriesResult[count].CName + ", " + result.GetAllCategoriesResult[count].CDescription + "<br>";
        resulttable += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    resulttable += "</table>";
    document.getElementById("result1").innerHTML = resulttable;
    
}

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var categoryname = document.getElementById("catid").value;
    var categorydescrip = document.getElementById("catdescrip").value;
    
    var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydescrip +'"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
             var result = JSON.parse(objRequest.responseText);
             OperationResult2(result);
        }
    }
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory); 
}

function OperationResult2(output)
{
     if (output.WasSuccessful == 1)
     {
        document.getElementById("result2").innerHTML = "The operation was successful!";
     }
     else
     {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
     }
}

function UpdateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var categoryid = document.getElementById("oldid").value;
    var newdescription = document.getElementById("newdescrip").value;
    
    var newupdate = '{"CID":"' + categoryid + '","CDescription":"' + newdescription + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
             var result = JSON.parse(objRequest.responseText);
             OperationResult3(result);
        }
    }
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newupdate);
}

function OperationResult3(output)
{
     if (output == 1)
     {
        document.getElementById("result3").innerHTML = "The operation was successful!";
     }
     else
     {
         document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
     }
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("lastid").value;
    
    var txt = "Delete Canceled";
    var r = confirm("Are you sure?");
    if (r === true)
    {    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
             var result = JSON.parse(objRequest.responseText);
             OperationResult4(result);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
    }
    else
    {
        document.getElementById("result4").innerHTML = txt;
    }
}

function OperationResult4(output)
{
    if(output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result4").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("result4").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}



















