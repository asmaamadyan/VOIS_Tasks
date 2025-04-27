function SubmitForm() {
    return ( 
        <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="name" isNotEmpty>Name</label>
          <input id="name" type="name" name="name" />
        </div>
        <div className="control no-margin">
          <label htmlFor="email" isEmail >E-Mail</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="address" isNotEmpty>Address</label>
          <input id="address" type="address" name="address" />
        </div>
        <div className="control no-margin">
          <label htmlFor="phone" isNotEmpty>Phone Number</label>
          <input id="phone" type="phone" name="phone" />
        </div>
      </div>
     );
}

export default SubmitForm;