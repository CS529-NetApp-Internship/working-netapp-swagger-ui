import os
import sys

from mako.template import Template

# Convert the template index_dev_api.html.t and index_dark_dev_api.html.t to
# their corresponding .html files.

# Get brand specific copyright, trademark, feedback info
def get_brand_dict(variant):
    brand = dict()
    if "fujitsu" in variant:
        brand["CAPS_BRAND"] = "FUJITSU"
        brand["BRAND"] = "Fujitsu"
        brand["COPYRIGHT_BRAND_TEXT"] = "FUJITSU LIMITED"
        brand["US"] = ""
        brand["TRADEMARK"] = """FUJITSU, FUJITSU logo, and ETERNUS are trademarks of Fujitsu. All other trademarks are the
    property of their respective owners. © 2020 FUJITSU LIMITED."""
        brand["CONTACT_US"] = """<p>
    You can help us to improve the quality of our documentation by sending us your feedback.
    If you have suggestions for improving this document, send us your comments through support
    site on the web.
    </p>

    <p><a id="contact" href="#">URL</a></p>

    <p>
    To help us direct your comments to the correct division, include in the subject line the
    product name, version, and operating system.
    </p>
    """
    else: # NetApp
        brand["CAPS_BRAND"] = "NETAPP"
        brand["BRAND"] = "NetApp"
        brand["COPYRIGHT_BRAND_TEXT"] = "NetApp, Inc"
        brand["US"] = "Printed in the U.S."
        brand["TRADEMARK"] = """NETAPP, the NETAPP logo, and the marks listed on the NetApp Trademarks page are trademarks of
    NetApp, Inc. Other company and product names may be trademarks of their respective owners.
    http://www.netapp.com/us/legal/netapptmlist.aspx"""
        brand["CONTACT_US"] = """<p>
    You can help us to improve the quality of our documentation by sending us your feedback.
    You can receive automatic notification when production-level (GA/FCS) documentation is
    initially released or important changes are made to existing production-level documents.
    If you have suggestions for improving this document, send us your comments by email:
    doccomments@netapp.com
    </p>

    <p>
    To help us direct your comments to the correct division, include in the subject line the
    product name, version, and operating system.
    </p>

    <p>
    If you want to be notified automatically when production-level documentation is released
    or important changes are made to existing production-level documents, follow Twitter
    account @NetAppDoc.</p>

    <p>You can also contact us in the following ways:</p>

    <p>
    NetApp, Inc., 495 East Java Drive, Sunnyvale, CA 94089 U.S.<br>
    Telephone: +1 (408) 822-6000<br>
    Fax: +1 (408) 822-4501<br>
    Support telephone: +1 (888) 463-8277
    </p>
    """
    return brand

def main():
    variant = sys.argv[-1]
    del sys.argv[-1]
    brand = get_brand_dict(variant)
    for temp in sys.argv:
        convert = Template(filename=temp)
        out_file = temp.replace("/src/mako/", "/dist/")
        out_file = out_file.replace(".t", ".{}".format(variant))
        with open(out_file, "w") as html:
            html.write(convert.render(**brand).replace("\r", ""))

if __name__ == "__main__":
    main()
