function SubmitForm() {

    return ( 
        <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="name" >Name</label>
          <input id="name" type="name" name="name" />
        </div>
        <div className="control no-margin">
          <label htmlFor="email"  >E-Mail</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="address" >Address</label>
          <input id="address" type="address" name="address" />
        </div>
        <div className="control no-margin">
          <label htmlFor="phone" >Phone Number</label>
          <input id="phone" type="phone" name="phone" />
        </div>
      </div>
     );
}

export default SubmitForm;