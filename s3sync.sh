#!/bin/bash
AWS_PROFILE=matiasraisanen aws s3 sync build/. s3://matiasraisanen.com/steamscore

