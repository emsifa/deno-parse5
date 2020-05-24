import ErrorReportingMixinBase from './mixin-base.js';
import ErrorReportingPreprocessorMixin from './preprocessor-mixin.js';
import Mixin from '../../utils/mixin.js';

class ErrorReportingTokenizerMixin extends ErrorReportingMixinBase {
    constructor(tokenizer, opts) {
        super(tokenizer, opts);

        const preprocessorMixin = Mixin.install(tokenizer.preprocessor, ErrorReportingPreprocessorMixin, opts);

        this.posTracker = preprocessorMixin.posTracker;
    }
}

export default ErrorReportingTokenizerMixin;
