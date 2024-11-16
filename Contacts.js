cfg.Dark;
var speech, q = 0;
class Main extends App
{
    onStart()
    {
        this.speech = app.CreateSpeechRec("Partial");
    this.speech.SetOnReady( this.speech_OnReady );
    this.speech.SetOnResult( this.speech_OnResult );
    this.speech.SetOnError( this.speech_OnError );

     app.SetStatusBarColor( "#ff0000" )
    app.SetNavBarColor( "#ff0000" )
        // Creates a fullscreen layout with objects vertically centered.
        this.main = ui.addLayout("main", "Linear", "VCenter,FillXY")
        
        // Adds an appbar to the layout
        this.apb = ui.addAppBar(this.main, "Mis Contactos", "Menu,Fixed", 1)
this.btn1 = ui.addButton(this.apb.layout, "speaker", "icon")
        this.btn1.setOnTouch(() => { this.speech.Recognize(); /*Messages", "Bottom")*/})
        // Avatar url
        var avatar = "person";//https://static.wikia.nocookie.net/heroes-and-villain/images/7/7e/Bilbo_BOFA_12.png/revision/latest/scale-to-width-down/350?cb=20190320192007"

//Query for all contact info where name begins with D.
    var uri = "content://com.android.contacts/data";
    var columns = "display_name, data1";
    var select = "";//"display_name LIKE ?";
    var params = "";//"D%";
    var rows = app.QueryContent( uri, columns, null, null);//select, params )
    
var list = new Array();
var a= 0;
    //Show result (stringify as useful way of converting JS objects to text)
    //alert( JSON.stringify(rows) )
    //alert(rows.length);
    for(a=0;a<rows.length;a++){
    	if(this.validatePhoneNumber(rows[a].data1) && !this.validatePhoneNumber(rows[a].display_name)){
 		   list.push([avatar, rows[a].display_name, rows[a].data1]);
   	 }
    }
    list = list.sort();
        // Initialize the contact items to show
        /*var list = [
            [avatar, "Frodo", "+0123456789"],
            [avatar, "Bilbo", "+0123456789"],
            [avatar, "Well", "+0123456789"]
        ]*/

        // Add a list control with avatar to the main layout
        this.lst = ui.addList(this.main, list, "Avatar,Menu", 1, 0.835)

        // Adds a callback handler when the list is touched
        this.lst.setOnTouch( this.onTouch )
    }

    onTouch(title, body, icon, action, index)
    {
        ui.showPopup("Llamando a " + title + " : " +body, "Short")
        app.Call( body );
    }
    
    validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

speech_OnResult(results){
alert(results.length);
	for(this.q=0;this.q<results.length;this.q++){
	app.ShowPopup(  this.q+ ":" +results[this.q]);
	}
//	this.speech.Stop();
}

speech_OnReady(){
this.speech.Recognize();
}
speech_OnError(error){
if(error != undefined){
alert("Error: \r"+error);
}
//if(!this.speech.IsListening()){this.speech.Stop();}
}

}