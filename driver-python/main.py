# ------------------------- changeable parameters -------------------------
hostName = "localhost"
serverPort = 3000

use_binance = True # binance test or ropsten
use_working_contract = True

use_separate_gui_for_website = False
# ------------------------- end of changeable parameters ------------------



### import :

# ui
from UiHandler import UI_start, UI_set_btn_callback, UI_set_gui_exit_callback, UI_set_label_text, UI_stop

# web server
from WebServer import WEBSERVER_start, WEBSERVER_set_post_callback, WEBSERVER_stop

# web browser url opener
if use_separate_gui_for_website:
    from WebBrowserGui import WEBGUI_open, WEBGUI_open_another_Thread, WEBGUI_stop, WEBGUI_run
else:
    from webbrowser import open as open_webpage

### consts

software_contract_adr = ""

if use_binance and use_working_contract:
    software_contract_adr = "0x0440829FeDcf48f26F77c2C2dBb49a14fa286111"
elif (not use_binance) and use_working_contract:
    software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120"
elif use_binance and (not use_working_contract):
    software_contract_adr = "0x0596762baE34B9A1e16E2c4c56318EdE6867fb63"
else: 
    software_contract_adr = "0xe4bfA4cA25D3C8E88C4E50C7AeF148685a53b988"

url_to_open = "http://" + hostName + ":" + str(serverPort) + "?contract=" + software_contract_adr + "&network=" + ("binance" if use_binance else "ropsten")

### func

def cb_license_was_checked(valid):
    if valid:
        print("successfully verified the authencity of the license")
        UI_set_label_text("license is valid")
        UI_set_label_text("License status: valid !")
    else:
        print("failed to verify license authencity: invalid license")
        UI_set_label_text("license is invalid")
        UI_set_label_text("License status: invalid.\nCLick on the button again to reverify the license.")

def start_license_check():
    print("btn clicked")
    UI_set_label_text("License status: being verified...")

    if use_separate_gui_for_website:
        WEBGUI_open_another_Thread(url_to_open)
        # WEBGUI_open(url_to_open)

        # import time
        # now = time.time()
        # while (time.time() - now < 10): pass
        # WEBGUI_run("document.getElementById('text').innerHTML = 'loool'")

    else:
        open_webpage(url_to_open)

def stop_all():
    UI_stop()
    WEBSERVER_stop()
    WEBGUI_stop()

if __name__ == "__main__":

    # ui setup
    UI_start()
    UI_set_btn_callback(start_license_check)
    UI_set_label_text("License status: not verified")
    UI_set_gui_exit_callback(stop_all)

    # web server handler
    WEBSERVER_start(hostName, serverPort)
    WEBSERVER_set_post_callback(cb_license_was_checked)

