package com.sample.xslt;

import java.lang.reflect.Field;
import java.util.ServiceLoader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.saxon.Configuration;
import net.sf.saxon.jaxp.SaxonTransformerFactory;
import net.sf.saxon.s9api.ExtensionFunction;
import net.sf.saxon.s9api.Processor;

/**
 * Extension to the normal Saxon HE JAXP {@link javax.xml.transform.TransformerFactory} that discovers and
 * registers ExtensionFunctions via the Java {@link ServiceLoader} framework.
 *
 */
public class TransformerFactory extends SaxonTransformerFactory {

	private static final Logger log = LoggerFactory
			.getLogger(TransformerFactory.class);

	public TransformerFactory() {
		super();

		registerExtensionFunctions();
	}

	public TransformerFactory(Configuration config) {
		super(config);

		registerExtensionFunctions();
	}

	private void registerExtensionFunctions() {
		Processor processor;
		try {
			Field processorField = SaxonTransformerFactory.class
					.getDeclaredField("processor");
			processorField.setAccessible(true);
			processor = (Processor) processorField.get(this);
			ServiceLoader<ExtensionFunction> extensionFunctions = ServiceLoader
					.load(ExtensionFunction.class, Thread.currentThread()
							.getContextClassLoader());

			for (ExtensionFunction extensionFunction : extensionFunctions) {
				log.info("Registering Saxon extension function {}",
						extensionFunction.getName());
				try {
					processor.registerExtensionFunction(extensionFunction);
				} catch (RuntimeException e) {
					log.warn("Unable to register Saxon extension function "
							+ extensionFunction.getName(), e);
				}
			}
		} catch (NoSuchFieldException | SecurityException
				| IllegalArgumentException | IllegalAccessException e) {
			log.error("Unable to access Saxon Processer object", e);
		}
	}

}
