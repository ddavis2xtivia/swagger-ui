package com.xtivia.speedray.swagger.ui.portlet;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;

/**
 * @author Liferay
 */
@Component(
	immediate = true,
	property = {
        "com.liferay.portlet.css-class-wrapper=portlet-jsp",
		"com.liferay.portlet.display-category=category.speedray",
        "com.liferay.portlet.instanceable=false",
        "com.liferay.portlet.header-portlet-css=/lib/app.css",
		"javax.portlet.display-name=Xtivia Speedray Swagger UI",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"com.liferay.portlet.footer-portlet-javascript=/portlet_loader.js",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class SwaggerUIPortlet extends MVCPortlet {
}