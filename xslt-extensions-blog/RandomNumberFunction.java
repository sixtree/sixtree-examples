package com.sample.xslt;

import java.util.Random;

import net.sf.saxon.s9api.ExtensionFunction;
import net.sf.saxon.s9api.ItemType;
import net.sf.saxon.s9api.OccurrenceIndicator;
import net.sf.saxon.s9api.QName;
import net.sf.saxon.s9api.SaxonApiException;
import net.sf.saxon.s9api.SequenceType;
import net.sf.saxon.s9api.XdmAtomicValue;
import net.sf.saxon.s9api.XdmValue;

/** Saxon Extension Function for generating random numbers (similar to the old exslt functions) */
public class RandomNumberFunction implements ExtensionFunction {

	private final Random rng = new Random();
	
	@Override
	public QName getName() {
		return new QName("http://sample.com/xslt", "random");
	}

	@Override
	public SequenceType getResultType() {
		return SequenceType.makeSequenceType(ItemType.FLOAT, OccurrenceIndicator.ONE);
	}

	@Override
	public SequenceType[] getArgumentTypes() {
		return new SequenceType[0];
	}

	@Override
	public XdmValue call(XdmValue[] paramArrayOfXdmValue)
			throws SaxonApiException {
		return new XdmAtomicValue(rng.nextFloat());
	}

}
