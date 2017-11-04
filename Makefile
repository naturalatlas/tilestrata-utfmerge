.PHONY: test test-ci-coverage release

_MOCHA=node_modules/.bin/_mocha
ISTANBUL=node_modules/.bin/istanbul
COVERALLS=node_modules/.bin/coveralls

test:
	npm test

test-ci-coverage:
	npm install coveralls
	npm install istanbul
	@rm -rf coverage
	npm run clean
	$(ISTANBUL) cover $(_MOCHA) --report lcovonly -- -R tap

	@echo
	@echo Sending report to coveralls.io...
	@cat ./coverage/lcov.info | $(COVERALLS)
	@rm -rf ./coverage
	@echo Done

release:
ifeq ($(strip $(version)),)
	@echo "\033[31mERROR:\033[0;39m No version provided"
	@echo "\033[1;30mmake release version=1.0.0\033[0;39m"
else
	rm -rf node_modules
	npm install
	npm install tilestrata
	make test
	npm version $(version)
	npm publish
	git push origin master
	git push origin --tags
endif
