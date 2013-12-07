<div class="page-header">
    <div class="row">
        <div class="col-md-1">
            <img src="images/melon.png" alt="Melon" width="64" height="64">
        </div>
        <div class="col-md-11">
            <h1>Password generator</h1>
        </div>
    </div>
    <p class="lead">Random password meeting user-specified requirements.</p>
</div>

<div id="app">
    <div class="row">
        <div class="col-md-12">
            <p>There are several excellent password utilities in circulation (<a href="https://lastpass.com/" 
            target="blank">LastPass</a>, <a href="https://www.dashlane.com/en/" target="blank">DashLane</a>, etc.) that
            normally fully automate password creation and use. But I occasionally run
            into situations where the automation doesn't work properly or a password with special characteristics
            is required. This utility is designed for such situations. It doesn't save anything, so you
            need to save the generated password somewhere. It simply creates
            random passwords meeting any reasonable set of requirements I've seen or could think of and provides
            a user-friendly interface for entering password specifications.
            </p>
            <table class="table table-striped">
                <thead>
                    <th>Required</th>
                    <th>Allowed</th>
                    <th>Excluded</th>
                    <th>Character group</th>
                </thead>
                <tbody>
                    <tr id="lowercase">
                        <td>
                            <input type="radio" name="lowercase" id="lowercase-required" value="required" checked>
                        </td>
                        <td>
                            <input type="radio" name="lowercase" id="lowercase-allowed" value="allowed">
                        </td>
                        <td>
                            <input type="radio" name="lowercase" id="lowercase-excluded" value="excluded">
                        </td>
                        <td>
                            Lowercase letters (a-z)
                        </td>
                    </tr>
                    <tr id="uppercase">
                        <td>
                            <input type="radio" name="uppercase" id="uppercase-required" value="required" checked>
                        </td>
                        <td>
                            <input type="radio" name="uppercase" id="uppercase-allowed" value="allowed">
                        </td>
                        <td>
                            <input type="radio" name="uppercase" id="uppercase-excluded" value="excluded">
                        </td>
                        <td>
                            Uppercase letters (A-Z)
                        </td>
                    </tr>
                    <tr id="digits">
                        <td>
                            <input type="radio" name="digits" id="digits-required" value="required" checked>
                        </td>
                        <td>
                            <input type="radio" name="digits" id="digits-allowed" value="allowed">
                        </td>
                        <td>
                            <input type="radio" name="digits" id="digits-excluded" value="excluded">
                        </td>
                        <td>
                            Decimal digits (0-9)
                        </td>
                    </tr>
                    <tr id="special">
                        <td>
                            <input type="radio" name="special" id="special-required" value="required">
                        </td>
                        <td>
                            <input type="radio" name="special" id="special-allowed" value="allowed">
                        </td>
                        <td>
                            <input type="radio" name="special" id="special-excluded" value="excluded" checked>
                        </td>
                        <td>
                            ASCII special characters (!"#$%&'()*+,-./:;&lt;=&gt;?@[\]^_`{|}~)
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h4>Other allowed characters:</h4>
            <div class="row">
                <div class="col-md-6">
                    Other allowed characters (overrides above exclusions):
                </div>
                <div class="col-md-6">
                    <input id="other-allowed" type="text" class="form-control" placeholder="!'#${}/">
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h4>Other required characters:</h4>
            <div class="row">
                <div class="col-md-6">
                    Other required character groups, separated by whitespace (overrides above exclusions):
                </div>
                <div class="col-md-6">
                    <input id="other-required" type="text" class="form-control" placeholder="!'# ${}/">
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-2">
                    Password length:
                </div>
                <div class="col-md-1">
                    <input id="length" type="text" class="form-control" value="8">
                </div>
            </div>
        </div>
    </div>
    <div class="row cm-margin-top-md">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-3">
                    <button id="create-btn" type="button" class="btn btn-default">Generate password</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row cm-margin-top-md">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12">
                    Password: <code id="password">password</code>
                </div>
            </div>
        </div>
    </div>
</div>
